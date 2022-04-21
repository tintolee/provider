import * as requestFromServer from "./contentsCrud";
import { contentsSlice, callTypes } from "./contentsSlice";

const { actions } = contentsSlice;

export const fetchContents = (queryParams, providerId) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));

    if (!providerId) {
        return dispatch(
            actions.contentsFetched({ totalCount: 0, entities: null })
        );
    }

    const filter = {
        ...queryParams,
        filter: {
            opportunityProviderId: { eq: providerId },
            ...queryParams.filter
        },
    };

    return requestFromServer
        .getAllContents(filter)
        .then((response) => {
            const { items } = response.data.listContents;
            dispatch(actions.contentsFetched({ items }));
        })
        .catch((error) => {
            console.log(error);

            error.clientMessage = "Can't find contents";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};

export const fetchContent = id => dispatch => {
    if (!id) {
        return dispatch(actions.contentFetched({ contentForEdit: undefined }));
    }

    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getContentById(id)
        .then(response => {
            const content = response.data.getContent;
            const updatedContent = {
                id: content.id,
                title: content.title,
                description: (content.description!== null) ? content.description: "",
                type: content.type,
                positiveFeedbacks: content.positiveFeedbacks,
                status: content.status,
                opportunityProvider: {
                    id: content.opportunityProvider.id
                },
                createdBy: {
                    id: content.createdBy.id
                },
            }
            if (content.type === "Blog") {
                updatedContent.blogTitle = content.blog.blogTitle;
                updatedContent.blogDescription = content.blog.blogDescription;
                updatedContent.blogCoverPhoto = content.blog.blogCoverPhoto;
                updatedContent.visibility = content.blog.visibility;
            }
            else if (content.type === "Video") {
                updatedContent.video = content.video;
            }
            else if (content.type === "Photo") {
                updatedContent.photo = content.photo;
            }
            dispatch(actions.contentFetched({ contentForEdit: updatedContent }));
        })
        .catch(error => {
            error.clientMessage = "Can't find content";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const createContent = contentForCreation => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .createContent(contentForCreation)
        .then(response => {
            const { content } = response.data.createContent;
            dispatch(actions.contentCreated({ content }));
        })
        .catch(error => {
            console.log(error); 
            error.clientMessage = "Can't create content";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const updateContent = content => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateContent(content)
        .then(() => {
            dispatch(actions.contentUpdated({ content }));
        })
        .catch(error => {
            console.log(error);
            error.clientMessage = "Can't update content";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};
