"""
Celery задачи для работы с GitHub API.
Обновляем статистику репозиториев, звезды и тд.
"""

import logging
from typing import Dict, Any, List

import httpx

from app.celery_app import celery_app
from app.core.config import settings

logger = logging.getLogger(__name__)


@celery_app.task(bind=True, max_retries=3)
def update_github_stats(self) -> Dict[str, Any]:
    """
    Обновляем статистику GitHub репозиториев.
    """
    try:
        headers = {}
        if settings.GITHUB_TOKEN:
            headers["Authorization"] = f"token {settings.GITHUB_TOKEN}"
        
        async with httpx.AsyncClient() as client:
            # Получаем список репозиториев
            response = await client.get(
                f"https://api.github.com/users/{settings.GITHUB_USERNAME}/repos",
                headers=headers
            )
            
            if response.status_code == 200:
                repos = response.json()
                
                total_stars = sum(repo["stargazers_count"] for repo in repos)
                total_forks = sum(repo["forks_count"] for repo in repos)
                total_repos = len(repos)
                
                # TODO: Обновляем статистику в базе данных
                
                logger.info(
                    f"Обновлена статистика GitHub: {total_repos} репозиториев, "
                    f"{total_stars} звезд, {total_forks} форков"
                )
                
                return {
                    "status": "success",
                    "total_repos": total_repos,
                    "total_stars": total_stars,
                    "total_forks": total_forks
                }
            else:
                raise Exception(f"GitHub API error: {response.status_code}")
                
    except Exception as e:
        logger.error(f"Ошибка при обновлении статистики GitHub: {e}")
        
        if self.request.retries < self.max_retries:
            raise self.retry(countdown=300, exc=e)  # Retry через 5 минут
        
        return {
            "status": "error",
            "message": str(e)
        }


@celery_app.task(bind=True, max_retries=3)
def sync_project_stars(self, project_github_urls: List[str]) -> Dict[str, Any]:
    """
    Синхронизируем количество звезд для проектов.
    """
    try:
        headers = {}
        if settings.GITHUB_TOKEN:
            headers["Authorization"] = f"token {settings.GITHUB_TOKEN}"
        
        updated_projects = []
        
        async with httpx.AsyncClient() as client:
            for github_url in project_github_urls:
                try:
                    # Извлекаем owner/repo из URL
                    if "github.com" in github_url:
                        parts = github_url.strip("/").split("/")
                        if len(parts) >= 2:
                            owner, repo = parts[-2], parts[-1]
                            
                            api_url = f"https://api.github.com/repos/{owner}/{repo}"
                            response = await client.get(api_url, headers=headers)
                            
                            if response.status_code == 200:
                                repo_data = response.json()
                                stars_count = repo_data["stargazers_count"]
                                
                                # TODO: Обновляем количество звезд в БД
                                updated_projects.append({
                                    "url": github_url,
                                    "stars": stars_count
                                })
                                
                except Exception as e:
                    logger.warning(f"Не удалось обновить статистику для {github_url}: {e}")
                    continue
        
        logger.info(f"Обновлена статистика для {len(updated_projects)} проектов")
        
        return {
            "status": "success",
            "updated_projects": len(updated_projects),
            "projects": updated_projects
        }
        
    except Exception as e:
        logger.error(f"Ошибка при синхронизации звезд проектов: {e}")
        
        if self.request.retries < self.max_retries:
            raise self.retry(countdown=300, exc=e)
        
        return {
            "status": "error",
            "message": str(e)
        }


# Периодическая задача для обновления статистики (можно настроить в celery beat)
@celery_app.task
def daily_github_sync() -> Dict[str, Any]:
    """
    Ежедневная синхронизация с GitHub.
    """
    logger.info("Запуск ежедневной синхронизации с GitHub")
    
    # Запускаем обновление статистики
    update_result = update_github_stats.delay()
    
    # TODO: Получаем список проектов из БД и синхронизируем звезды
    # sync_result = sync_project_stars.delay(project_urls)
    
    return {
        "status": "success",
        "message": "Ежедневная синхронизация запущена",
        "task_id": update_result.id
    }