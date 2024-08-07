import {
    type ApiError,
    type SemanticLayerField,
    type SemanticLayerQuery,
    type SemanticLayerView,
} from '@lightdash/common';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import {
    apiGetSemanticLayerViewFields,
    apiGetSemanticLayerViews,
    apiPostSemanticLayerSql,
} from './requests';

type useGetSemanticLayerViewsParams = {
    projectUuid: string;
};

export const useSemanticLayerViews = ({
    projectUuid,
}: useGetSemanticLayerViewsParams) =>
    useQuery<SemanticLayerView[], ApiError>({
        queryKey: [projectUuid, 'semanticLayer', 'views'],
        queryFn: () => apiGetSemanticLayerViews({ projectUuid }),
    });

type SemanticLayerViewFieldsParams = {
    projectUuid: string;
    view: string;
};

export const useSemanticLayerViewFields = ({
    projectUuid,
    view,
}: SemanticLayerViewFieldsParams) =>
    useQuery<SemanticLayerField[], ApiError>({
        queryKey: [projectUuid, 'semanticLayer', view, 'fields'],
        queryFn: () => apiGetSemanticLayerViewFields({ projectUuid, view }),
    });

type SemanticLayerSqlParams = {
    projectUuid: string;
    payload: SemanticLayerQuery;
};

export const useSemanticLayerSql = (
    { projectUuid, payload }: SemanticLayerSqlParams,
    useQueryParams?: UseQueryOptions<string, ApiError>,
) =>
    useQuery<string, ApiError>({
        queryKey: [
            projectUuid,
            'semanticLayer',
            'sql',
            JSON.stringify(payload),
        ],
        queryFn: () => apiPostSemanticLayerSql({ projectUuid, payload }),
        ...useQueryParams,
    });
