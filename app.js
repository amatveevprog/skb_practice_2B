import express from 'express';
import cors from 'cors';

import InitialsTransformer from './initials_parsing';

const app = express();

app.use(cors());

app.get('/parse', async (req, res, next) => {
  let result='';
  if(req.query.fullname!='') {
    const i_transformer = new InitialsTransformer(req.query.fullname);
    result = await i_transformer.parse();
  }
  else
  {
    result='Invalid fullname';
  }
  res.send(result);
  res.end();
  return next();
});

app.listen(1000,()=>{console.log('Server Started. Listening on port 1000...')});
