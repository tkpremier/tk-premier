import 'dotenv/config';
import fs from 'fs';
import { google } from 'googleapis';
import path from 'path';

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
    try {
      const { tokens } = await oauth2.getToken(code);

      if (!tokens.refresh_token) {
        console.error('No refresh_token returned. Make sure access_type=offline and prompt=consent.');
        process.exit(1);
      }

      const refreshToken = tokens.refresh_token;
      console.log('\nGot refresh token:\n', refreshToken);

      // 👉 Write/update .env
      const envPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
      let env = '';

      if (fs.existsSync(envPath)) {
        env = fs.readFileSync(envPath, 'utf8');
      }

      const newLine = `GD_REFRESH_TOKEN=${refreshToken}`;

      if (env.match(/^GD_REFRESH_TOKEN=.*$/m)) {
        // replace existing line
        env = env.replace(/^GD_REFRESH_TOKEN=.*$/m, newLine);
      } else {
        // append
        if (!env.endsWith('\n') && env.length > 0) {
          env += '\n';
        }
        env += newLine + '\n';
      }

      fs.writeFileSync(envPath, env);
      console.log(`\n✅ .env.${process.env.NODE_ENV} updated with GD_REFRESH_TOKEN`);

      process.exit(0);
    } catch (err: any) {
      console.error('Error exchanging code for tokens:', err.message || err);
      process.exit(1);
    }
  });
}
main().catch(e => {
  console.error(e);
  process.exit(1);
});
