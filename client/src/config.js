// export const SERVER_URI = 'http://localhost:5000';
// export const SERVER_API = 'http://localhost:5000/api';

// export const SERVER_URI = 'http://192.168.0.113:5000';
// export const SERVER_API = 'http://192.168.0.113:5000/api';

// export const SERVER_URI = 'http://157.230.255.216:5000';
// export const SERVER_API = 'http://157.230.255.216:5000/api';

export const SERVER_URI = 'https://cpremm.dohcaraga.org';
export const SERVER_API = 'https://cpremm.dohcaraga.org/api';

export const JWT = 'doh-jwt';
export const USER_ROUTES = 'doh-user-routes';
export const USER_ROLE = 'doh-user-role';

export const APP_ROUTES = [
        // {
        //     active: false,   
        //     path: '/',
        //     text: 'Dashboard'
        // },

        {
            active: false,
            path: '/',
            text: 'CPreMM',
            sub: [
                {
                    active: false,
                    path: '/admin/recordsNew',
                    text: 'Preventive'
                },        
                {
                    active: false,
                    path: '/admin/job-order-request',
                    text: 'Corrective'
                },        
                {
                    active: false,
                    path: '/admin/device',
                    text: 'Devices'
                },
            ]
        },

        {
            active: false,
            path: '/ceir/dashboard',
            text: 'VIMS-IR',
            sub: [
                {
                    active: false,
                    path: '/ceir/hf-personnel',
                    text: 'HF Personnel'
                },        
                {
                    active: false,
                    path: '/ceir/doh-chd-personnel',
                    text: 'DOH CHD Personnel'
                },        
                {
                    active: false,
                    path: '/ceir/duplicates',
                    text: 'Personnel Duplicates'
                },        
                {
                    active: false,
                    path: '/ceir/annex-a',
                    text: 'Annex A'
                },  
                {
                    active: false,
                    path: '/ceir/health-facility',
                    text: 'Health Facility'
                },
                {
                    active: false,
                    path: '/ceir/vaccination-sites',
                    text: 'Vaccination Sites'
                },
                {
                    active: false,
                    path: '/ceir/vaccinees-profile',
                    text: 'Vaccinees Profile'
                },

                {
                    active: false,
                    path: '/ceir/pre-post-monitoring',
                    text: 'Pre-Post Monitoring'
                },

                {
                    active: false,
                    path: '/ceir/vas-report',
                    text: 'VAS Report'
                  },
            ]
        },

        {
            active: false,
            path: '/admin/user',
            text: 'Admin Setting',
            sub: [
                {
                    active: false,
                    path: '/admin/user',
                    text: 'Users'
                },        
                {
                    active: false,
                    path: '/admin/office',
                    text: 'Offices'
                },        
                {
                    active: false,
                    path: '/admin/role',
                    text: 'Roles'
                },        
                {
                    active: false,
                    path: '/admin/app-module',
                    text: "App Module"
                },       
                {
                    active: false,
                    path: '/admin/reported-issues',
                    text: 'Reported Issues'
                },  
            ]
        },   
        {
            active: false,
            path: '/qr',
            text: 'Qr',
        },
   
        // {
        //     active: false,
        //     path: '/admin/reported-issues',
        //     text: 'Others',
        //     sub: [
        //         {
        //             active: false,
        //             path: '/admin/reported-issues',
        //             text: 'Reported Issues'
        //         },
        //         // {
        //         //     active: false,
        //         //     path: '/upload',
        //         //     text: 'File Upload'
        //         // },
        //     ]
        // },

//=================~setup component in APP_ROUTES config~=================        

      ]
      
    //   /my-reported-issues
