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



export { MUTATION_LOGIN };
export { MUTATION_IMAGE_UPLOAD };
