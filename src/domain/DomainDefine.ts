import { Entity, Enum, WithDomainModel } from "./DomainModel";
import { Model, ValidateError } from "@quick-qui/model-core";
import _ from "lodash";
import { domainWeavers } from "./DomainWeavers";
import { DomainValidator } from "./DomainValidator";
import { deepMerge, withNamespace } from "../Merge";

interface DomainPiece {
  entities: Entity[];
  enums: Enum[];
}

const domainDefine = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(
    model: Model & WithDomainModel,
    piece: any,
    buildingContext: any
  ): Model {
    return deepMerge(model, {
      domainModel: {
        entities: withNamespace(piece.entities??[], buildingContext),
        enums: withNamespace(piece.enums??[], buildingContext)
      }
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
