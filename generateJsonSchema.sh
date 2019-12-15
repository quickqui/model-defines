./node_modules/.bin/ts-json-schema-generator -p ./src/domain/DomainModel.ts -f 'tsconfig.json' -t Entity > ./src/domain/EntitySchema.json
./node_modules/.bin/ts-json-schema-generator -p ./src/function/FunctionModel.ts -f 'tsconfig.json' -t Function> ./src/function/FunctionSchema.json
./node_modules/.bin/ts-json-schema-generator -p ./src/implementation/ImplementationModel.ts -f 'tsconfig.json' -t Implementation> ./src/implementation/ImplementationSchema.json
./node_modules/.bin/ts-json-schema-generator -p ./src/presentation/PageModel.ts -f 'tsconfig.json' -t PageModel> ./src/presentation/PageModelSchema.json
./node_modules/.bin/ts-json-schema-generator -p ./src/presentation/PresentationModel.ts -f 'tsconfig.json' -t PresentationModel> ./src/presentation/PresentationModelSchema.json