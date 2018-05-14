### 
frontend build
---
 
1. modify the api root of backend address in ```/frontend/src/http.js line 5``` ;
2. modify the socket address in ```/frontend/src/views/TopicChosen.vue line 40``` and ```/frontend/src/views/Battle.vue line 104```
3. 
``` shell
cd frontend
npm i
npm run build
```


backend config
---
###
write redis config in config/default.yaml or config/production.js, which depend on your NODE_ENV.

###
``` shell
npm run init
npm run dev
```

open localhost:8000/index.html
