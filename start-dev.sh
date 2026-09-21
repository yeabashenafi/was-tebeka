#!/bin/bash

# Ensure we stop both Docker and Frontend when Ctrl+C is pressed
cleanup() {
    echo -e "\n🛑 Stopping Development Environment..."
    kill $FRONTEND_PID 2>/dev/null
    docker compose down
    exit 0
}

trap cleanup SIGINT SIGTERM

echo "🚀 Starting Database and Backend..."
docker compose up -d

echo "📦 Checking Frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo "🚀 Starting Frontend..."
npm run dev &
FRONTEND_PID=$!

echo -e "\n✅ Development environment is up!"
echo "🖥️  Frontend running at: http://localhost:3000"
echo "⚙️  Backend API running at: http://localhost:8000"
echo -e "\n📜 Showing backend logs (Press Ctrl+C to stop everything):\n"

cd ..
docker compose logs -f

wait $FRONTEND_PID
