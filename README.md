# IELTS Mock Imtihoni — Backend (Express + MongoDB)

## Ishga tushirish
1) `cp .env.example .env` va qiymatlarni to'ldiring
2) `npm install`
3) `npm run dev` (yoki `npm start`)

## API
Base URL: `http://localhost:4000`

### Foydalanuvchi
- **GET /health**
- **GET /api/test?limit=30**
  - Tasodifiy savollarni qaytaradi (max 50).
  - Response:
    ```json
    [
      {"_id":"...","text":"...","options":["A","B","C","D"],"correctAnswerIndex":2}
    ]
    ```

### Admin (Authorization: `Bearer <ADMIN_TOKEN>`)
- **GET /api/questions**
- **POST /api/questions**
  - Body:
    ```json
    {"text":"Savol?","options":["A","B","C","D"],"correctAnswerIndex":1}
    ```
- **PUT /api/questions/:id**
- **DELETE /api/questions/:id**

## CURL misollar
```bash
# Test savollarini olish
curl http://localhost:4000/api/test

# Admin sifatida ro'yxat
curl -H "Authorization: Bearer SUPER" http://localhost:4000/api/questions

# Admin yaratish
curl -X POST http://localhost:4000/api/questions \
 -H "Authorization: Bearer SUPER" -H "Content-Type: application/json" \
 -d '{"text":"Capital of UK?","options":["Paris","London","Rome","Berlin"],"correctAnswerIndex":1}'
