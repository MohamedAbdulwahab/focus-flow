import admin from 'firebase-admin';

import serviceAccount from '../../etc/secrets/serviceAccount.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { admin };
