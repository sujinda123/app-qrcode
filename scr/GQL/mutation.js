import { gql } from '@apollo/client';

const MUTATION_LOGIN = gql`
    mutation login($Username: String!, $Password: String!) {
            login(Username: $Username, Password: $Password) {
                token
            }
    }
`;

const MUTATION_IMAGE_UPLOAD = gql`
    mutation($file: Upload!, $assetID: Int!) {
        singleUploadLocal(file: $file, assetID: $assetID) {
            filename
            mimetype
            encoding
            location
        }
    }
`;

const MUTATION_UPDATE_STATUS_ASSET = gql`
    mutation($assetID: Int!, $assetStatus: Int!){
        updateStatusAsset(assetID: $assetID, assetStatus: $assetStatus){
        status
        }
    }
`;

const MUTATION_DELETE_IMAGE_ASSET = gql`
    mutation($ImgID: Int!){
        deleteImageAsset(ImgID: $ImgID){
        status
        }
    }
`;

export { MUTATION_LOGIN };
export { MUTATION_IMAGE_UPLOAD };
export { MUTATION_UPDATE_STATUS_ASSET };
export { MUTATION_DELETE_IMAGE_ASSET };
