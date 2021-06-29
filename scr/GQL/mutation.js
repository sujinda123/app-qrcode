import { gql } from '@apollo/client';

const MUTATION_LOGIN = gql`
    mutation login($Username: String!, $Password: String!) {
            login(Username: $Username, Password: $Password) {
                token
            }
    }
`;

const MUTATION_IMAGE_UPLOAD = gql`
    mutation UPLOAD_FILE($file: Upload!){
        singleUploadLocal(file: $file){
            success
            message
            mimetype
            encoding
            filename
            location
        }
    }
`;



export { MUTATION_LOGIN };
export { MUTATION_IMAGE_UPLOAD };
