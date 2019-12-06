import { Entity, Enum, WithDomainModel } from "./DomainModel";
import { Model, ValidateError } from "@quick-qui/model-core";
import _ from "lodash";
import { domainWeavers } from "./DomainWeavers";
import { DomainValidator } from "./DomainValidator";
import { deepMerge } from "../Merge";

interface DomainPiece {
  entities: Entity[];
  enums: Enum[];
}

const domainDefine = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model & WithDomainModel, piece: any): Model {
    // return {
    //   ...model,
    //   domainModel: {
    //     ...model.domainModel,
    //     entities: [
    //       ...(model.domainModel?.entities ?? []),
    //       ...(piece.entities ?? [])
    //     ],
    //     enums: [...(model.domainModel?.enums ?? []), ...(piece.enums ?? [])]
    //   }
    // };
    return deepMerge(model, {
      domainModel: { entities: piece.entities ?? [], enums: piece.enums ?? [] }
    });
  },
  validateAfterMerge(model: Model): ValidateError[] {
    return new DomainValidator().validate(model);
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return [];
  },
  weavers: domainWeavers
};
export default domainDefine;
