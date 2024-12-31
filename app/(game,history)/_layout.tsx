/**
 * Enable the array syntax for shared routes with the following code
 * 
 * NOTE: unstable_settings does not  work with async routes!!!
 */ 

export const unstable_settings = {
    initialRouteName: 'game',
    search: {
      initialRouteName: 'history',
    },
  };
  
  export default function DynamicLayout({ segment }) {
    //  ... 
  }
  