# Batch 1: Root files and backend
git add .gitignore README.md package.json .env.example
if (Test-Path backend) { git add backend/ }
if (Test-Path frontend) { git add frontend/ }
# Unstage large assets from frontend to make the first commit small
git reset frontend/src/assets/

git commit -m "chore: initial setup and code"
git push -u origin main

# Batch 2: Add png assets
git add frontend/src/assets/*.png
git commit -m "chore: add png assets"
git push

# Batch 3: Add remaining assets
git add frontend/src/assets/
git commit -m "chore: add remaining assets"
git push

Write-Host "All batches pushed successfully!"
