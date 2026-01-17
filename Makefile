.PHONY: backend frontend

backend:
	cd backend && uvicorn main:app --reload

frontend:
	cd frontend && pnpm run dev