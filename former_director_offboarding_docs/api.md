The function/resource that runs the actual API lives here: https://console.cloud.google.com/run/detail/us-central1/external-api-rev/metrics?inv=1&invt=AbzrMQ&project=tag-stg-db

All API keys created and any usage info is stored here: https://console.cloud.google.com/firestore/databases/external-api-rev/data/panel/api-keys/1-RkXJjVMrb-RzC-xpfkQa-TCnduwASbE7fHLdq8hbuCxxMiR0Osccqt41ANX9eT5xmMRHDzfghVv8kEquJ7-Fp57C5OgKtS1gdGKhWzoy-5vbONPG-SEyKGhPLLGLhAC9P38Q_81-C5Yz5aEoyQaApthyOmxUSjGayeSW8tGs13U_SMxkaL-RnVbNSfJ6EZh5l1y76sPh6GqJ-fcoYePWzWgiEo7RXk7QJoxlK7YbFOUE55gEix6IzwzQ_IeUY?inv=1&invt=AbzrMQ&project=tag-stg-db

To create a new API key, run the following code and pass the vendor code/id and vendor name to the “create_api_key” function. You will need to have the correct packages installed (firestore and google oauth). This will store the API key into the firestore database (linked above) as well as print out the API key.


import os
import base64
from google.cloud import firestore
from google.oauth2 import service_account


SERVICE_ACCOUNT_FILE = 'keys.json'
creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE)
db = firestore.Client(credentials=creds, database='external-api-rev')


def create_api_key(vendor_id, vendor_name):
   random_bytes = os.urandom(191)  # 191 bytes to account for base64 padding
   api_key = base64.urlsafe_b64encode(random_bytes).decode('utf-8').rstrip('=')  # Remove padding characters
   if len(api_key) > 255:
       api_key = api_key[:255]  # Truncate to 255 characters if necessary
   db.collection('api-keys').document(api_key).set({
       'vendor_id': vendor_id,
       'vendor_name': vendor_name,
       'created_at': firestore.SERVER_TIMESTAMP
   })
   return api_key


api_key = create_api_key('GOTL', 'Get Out the Lists')
print(f"Generated API Key: {api_key}")
print(f"API Key Length: {len(api_key)}")

