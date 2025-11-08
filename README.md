Arch

```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── config/ 
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── cache.config.ts
│   │   ├── storage.config.ts
│   │   └── env.validation.ts
│   │
│   ├── common/                             # технический фундамент
│   │   ├── exceptions/
│   │   │   ├── http-exceptions.filter.ts
│   │   │   └── domain-exceptions.ts
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── middlewares/
│   │   ├── pipes/
│   │   └── utils/
│   │
│   ├── infrastructure/                      # Адаптеры (внешние зависимости)
│   │   ├── database/
│   │   │   ├── prisma.service.ts
│   │   │   ├── prisma.module.ts
│   │   │   ├── migrations/
│   │   │   └── seeds/
│   │   │
│   │   ├── cache/
│   │   │   ├── redis.module.ts
│   │   │   └── redis.service.ts
│   │   │
│   │   ├── storage/
│   │   │   ├── fs-storage.provider.ts
│   │   │   ├── s3-storage.provider.ts
│   │   │   └── storage.module.ts
│   │   │
│   │   ├── messaging/
│   │   │   ├── events.module.ts
│   │   │   └── event-bus.service.ts
│   │   │
│   │   └── security/
│   │       ├── bcrypt.provider.ts
│   │       ├── jwt.provider.ts
│   │       └── crypto.provider.ts
│   │
│   ├── domain/                               # Доменные сущности (чистые классы)
│   │   ├── document/
│   │   │   ├── document.entity.ts
│   │   │   ├── document-version.entity.ts
│   │   │   ├── value-objects/
│   │   │   │   └── document-content.vo.ts
│   │   │   └── document-policy.ts
│   │   │
│   │   ├── user/
│   │   │   ├── user.entity.ts
│   │   │   ├── user-settings.entity.ts
│   │   │   └── value-objects/
│   │   │
│   │   └── shared-kernel/
│   │       ├── base.entity.ts
│   │       ├── audit.entity.ts
│   │       └── domain-events.ts
│   │
│   ├── application/                           # Use cases (бизнес-логика)
│   │   ├── document/
│   │   │   ├── commands/
│   │   │   │   ├── create-document.usecase.ts
│   │   │   │   ├── update-document.usecase.ts
│   │   │   │   ├── delete-document.usecase.ts
│   │   │   │   └── restore-version.usecase.ts
│   │   │   ├── queries/
│   │   │   │   ├── get-document.usecase.ts
│   │   │   │   ├── list-documents.usecase.ts
│   │   │   │   └── get-versions.usecase.ts
│   │   │   └── interfaces/
│   │   │       ├── document.repository.ts
│   │   │       └── version.repository.ts
│   │   │
│   │   ├── user/
│   │   │   ├── commands/
│   │   │   └── queries/
│   │   │
│   │   └── shared/
│   │       └── types/
│   │
│   ├── modules/                               # Модули NestJS (тонкие оболочки)
│   │   ├── documents/
│   │   │   ├── documents.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── documents.controller.ts
│   │   │   ├── presenters/
│   │   │   │   └── document.presenter.ts
│   │   │   └── mappers/
│   │   │       └── document.mapper.ts
│   │   │
│   │   ├── versions/
│   │   │   ├── versions.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── versions.controller.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   └── controllers/
│   │   │       └── users.controller.ts
│   │   │
│   │   ├── sync/                              # WebSocket / SSE sync
│   │   │   ├── sync.module.ts
│   │   │   ├── gateways/
│   │   │   │   └── sync.gateway.ts
│   │   │   └── handlers/
│   │   │       └── sync-event.handler.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── controllers/
│   │   │   └── strategies/
│   │   │
│   │   └── health/
│   │       ├── health.module.ts
│   │       └── health.controller.ts
│   │
│   └── interfaces/                             # API-контракты
│       ├── http/
│       │   ├── document.response.ts
│       │   └── user.response.ts
│       ├── ws/
│       │   └── sync.events.ts
│       └── dto/
│           ├── document.dto.ts
│           ├── version.dto.ts
│           └── user.dto.ts
│
├── test/
│
├── nest-cli.json
├── package.json
└── tsconfig.json

```