import { gql } from '@apollo/client';

const QUERY_SEARCH = gql`
  query getSearch($ASSET_CODE: String!){
    getSearch(input: {ASSET_CODE: $ASSET_CODE}, limit:20, page:1){
      ASSET_ID
      ASSET_CODE
      ASSET_NAME
      ASSET_NUMBER
      ASSET_BRAND
      ASSET_MODEL
      ASSET_SERIALNUMBER
      ASSET_IMAGES{
        IMAGE_NAME
      }
      ASSET_STATUS{
        STATUS_NAME
      }
      ASSET_ROOM{
        ROOM_NAME
      }
      ASSET_ORIGINAL_ROOM{
        ROOM_NAME
      }
      UPDATE_DATE
    }
  }
`

const QUERY_USER = gql`
  query{
    getUser{
        USER_ID
        USER_USERNAME
        USER_FIRSTNAME
        USER_LASTNAME
    }
  }
`;

const QUERY_STATUS = gql`
  query{
    getUser{
      ASSET_PRIVILEGE{
        STATUS_NAME
      }
    }
  }
`;

export {QUERY_USER};
export {QUERY_STATUS};
export {QUERY_SEARCH};