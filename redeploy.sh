git add .
git commit -m "redeploy [$(date)]"
git push -u origin master
npm run deploy

