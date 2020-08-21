./node_modules/.bin/ts-json-schema-generator -p ./src/domain/DomainModel.ts -f 'tsconfig.json' -t Entity > ./src/domain/EntitySchema.json
./node_modules/.bin/ts-json-schema-generator -p ./src/function/FunctionModel.ts -f 'tsconfig.json' -t Function> ./src/function/FunctionSchema.json
./node_modules/.bin/ts-json-schema-generator -p ./src/implementation/ImplementationModel.ts -f 'tsconfig.json' -t Implementation> ./src/implementation/ImplementationSchema.json
./node_modules/.bin/ts-json-schema-generator -p ./src/presentation/PageModel.ts -f 'tsconfig.json' -t Page> ./src/presentation/PageSchema.json
./node_modules/.bin/ts-json-schema-generator -p ./src/presentation/PresentationModel.ts -f 'tsconfig.json' -t Presentation> ./src/presentation/PresentationSchema.json
./node_modules/.bin/ts-json-schema-generator -p ./src/exchange/ExchangeModel.ts -f 'tsconfig.json' -t Exchange> ./src/exchange/ExchangeSchema.json
./node_modules/.bin/ts-json-schema-generator -p ./src/info/InfoModel.ts -f 'tsconfig.json' -t Info> ./src/info/InfoSchema.json