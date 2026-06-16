## Launch backend

```
npx nx serve backend
```

## Tests backend
```
npx nx test @markdown/backend
```

## DB
```
bash scripts/db-dev.sh init
```

## Build
```
$env:NEXT_PUBLIC_GRAPHQL_ENDPOINT="http://localhost:4000/api/graphql"
npm run tauri:build --workspace @markdown/desktop
```

## Dev
```
$env:NEXT_PUBLIC_GRAPHQL_ENDPOINT="http://localhost:4000/api/graphql"
npm run tauri:dev --workspace @markdown/desktop
```
