import { gql } from '@apollo/client';



const QUERY_USER = gql`
  query{
    getUser{
      USER_FIRSTNAME
      USER_LASTNAME
      USER_PRIVILEGE{
        PRIVILEGE_NAME
      }
    }
  }
`;

const QUERY_ASSET_PRIVILEGE = gql`
  query{
    getUser{
      ASSET_PRIVILEGE{
        STATUS_ID
        STATUS_NAME
      }
    }
  }
`;

const QUERY_ASSET_NUM = gql`
  query{
    getUser{
      USER_ASSET_NUM_CHECK
      USER_ASSET_NUM_NOT_CHECK
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

const QUERY_ASSET_CHECK = gql`
  query{
    getUser{
      USER_CHECK_ASSET{
        ASSET_ID
        ASSET_CODE
        ASSET_NAME
        ASSET_USER{
          USER_FIRSTNAME
          USER_LASTNAME
        }
        ASSET_NUMBER
        ASSET_PRICE
        ASSET_BRAND
        ASSET_MODEL
        ASSET_SERIALNUMBER
        ASSET_IMAGES{
          IMAGE
        }
        ASSET_COUNT_IMAGES
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
        CREATE_DATE
      }
    }
  }
`;

const QUERY_ASSET_NOT_CHECK = gql`
  query{
    getUser{
      USER_NOT_CHECK_ASSET{
        ASSET_ID
        ASSET_CODE
        ASSET_NAME
        ASSET_USER{
          USER_FIRSTNAME
          USER_LASTNAME
        }
        ASSET_NUMBER
        ASSET_PRICE
        ASSET_BRAND
        ASSET_MODEL
        ASSET_SERIALNUMBER
        ASSET_IMAGES{
          IMAGE
        }
        ASSET_COUNT_IMAGES
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
        CREATE_DATE
      }
    }
  }
`;

const QUERY_SEARCH_ASSET = gql`
  query getSearch($ASSET_CODE: String!){
    getSearch(input: {ASSET_CODE: $ASSET_CODE}, limit:20, page:1){
      ASSET_ID
      ASSET_CODE
      ASSET_NAME
      ASSET_USER{
        USER_FIRSTNAME
        USER_LASTNAME
      }
      ASSET_NUMBER
      ASSET_PRICE
      ASSET_BRAND
      ASSET_MODEL
      ASSET_SERIALNUMBER
      ASSET_IMAGES{
        IMAGE_ID
        IMAGE
      }
      ASSET_COUNT_IMAGES
      ASSET_STATUS{
        STATUS_ID
        STATUS_NAME
      }
      ASSET_ROOM{
        ROOM_NAME
      }
      ASSET_ORIGINAL_ROOM{
        ROOM_NAME
      }
      UPDATE_DATE
      CREATE_DATE
    }
  }
`

const QUERY_SEARCH_ASSET_SCANNER = gql`
  query getSearch($ASSET_CODE: String!){
    getSearch(input: {ASSET_CODE: $ASSET_CODE}, limit:20, page:1){
      ASSET_ID
      ASSET_CODE
      ASSET_NAME
      ASSET_USER{
        USER_FIRSTNAME
        USER_LASTNAME
      }
      ASSET_NUMBER
      ASSET_PRICE
      ASSET_BRAND
      ASSET_MODEL
      ASSET_SERIALNUMBER
      ASSET_COUNT_IMAGES
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
      CREATE_DATE
    }
  }
`

export {QUERY_USER};
export {QUERY_ASSET_PRIVILEGE};
export {QUERY_ASSET_NUM};
export {QUERY_STATUS};
export {QUERY_ASSET_CHECK};
export {QUERY_ASSET_NOT_CHECK};
export {QUERY_SEARCH_ASSET};
export {QUERY_SEARCH_ASSET_SCANNER};