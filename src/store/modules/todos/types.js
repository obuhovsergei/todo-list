import { baseActionTypes } from "@/store/shared/base/types";
import { listingGetterTypes, listingActionTypes, listingMutationTypes } from "@/store/shared/listing/types";
import { pagingActionTypes, pagingMutationTypes } from "@/store/shared/paging/types";
import { searchMixinTypes } from "@/store/shared/search/types";
import { sortingActionTypes, sortingMutationTypes } from "@/store/shared/sorting/types";
import {
    mutationTypes as stateManipulationMutationTypes,
    actionTypes as stateManipulationActionTypes
} from "@/store/shared/stateManipulation/types";

export const namespace = "todos";
export const relativeNamespace = "todos";

export const getterTypes = {
    ...listingGetterTypes
};
export const actionTypes = {
    ...stateManipulationActionTypes,
    ...pagingActionTypes,
    ...sortingActionTypes,
    ...listingActionTypes,
    ...baseActionTypes,
    ...searchMixinTypes.actionTypes,
    deleteTodo: "deleteTodo",
    save: "save"
};

export const mutationTypes = {
    ...stateManipulationMutationTypes,
    ...sortingMutationTypes,
    ...pagingMutationTypes,
    ...listingMutationTypes,
    ...searchMixinTypes.mutationTypes
};

