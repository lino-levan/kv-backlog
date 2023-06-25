import {
  createGitHubOAuth2Client,
  getSessionAccessToken,
  getSessionId,
} from "auth";

export const provider = createGitHubOAuth2Client();

export async function getUser(req: Request): Promise<
  null | {
    login: string;
    id: number;
    avatar_url: string;
    name: string;
  }
> {
  const sessionId = await getSessionId(req);
  if (!sessionId) return null;
  const accessToken = await getSessionAccessToken(provider, sessionId);
  if (!accessToken) return null;

  const userReq = await fetch("https://api.github.com/user", {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  return await userReq.json();
}
