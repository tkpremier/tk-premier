import 'dotenv/config';
import { google } from 'googleapis';

async function main() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GDCLIENTID!,
    process.env.GD_CLIENT_SECRET!,
    process.env.GD_REDIRECT_URI!
  );

  const url = oauth2.generateAuthUrl({
    access_type: 'offline', // critical for refresh_token
    prompt: 'consent', // force issuance
    scope: ['https://www.googleapis.com/auth/drive']
  });
  console.log('Open this URL, approve as YOUR account:\n', url);
  console.log('\nPaste the ?code= value here and press Enter:');

  process.stdin.once('data', async buf => {
    const code = buf.toString().trim();
    const { tokens } = await oauth2.getToken(code);
    console.log('\nREFRESH TOKEN:', tokens.refresh_token);
    process.exit(0);
  });
}
main().catch(console.error);
