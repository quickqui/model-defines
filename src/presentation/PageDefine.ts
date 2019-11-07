import { Model, ValidateError } from "@quick-qui/model-core";

const define = {
    validatePiece(piece: any):ValidateError[]{
        return []
    },
    merge(model: Model, piece: any): Model {
        const _model = model as any;
        return {
            ..._model,
            pages: (_model.pages || []).concat(piece.pages || [])
        } as Model
    },

    validateAfterMerge(model: Model): ValidateError[] { return [] },
    validateAfterWeave(model: Model): ValidateError[] { return [] },
    weavers:[]
}
export default define