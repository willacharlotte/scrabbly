// list of sites allowed to access backend
const whitelist = ['https://www.google.com', 'http://localhost:4000', 'https://gehb3cxzdn.eu-west-1.awsapprunner.com'];

export const corsOptions = {
  origin: (origin:any, callback:any) => {
    if(whitelist.indexOf(origin) !== -1 || !origin){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};
