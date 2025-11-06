import { Request, Response } from 'express';

export const getAuthentication = async (req: Request, res: Response) => {
  try {
    const authenticated = req.oidc.isAuthenticated();
    if (!authenticated) {
      throw new Error('User is not authenticated');
    }
    res.status(200).json({ authenticated, user: req.oidc.user });
  } catch (error) {
    res.status(401).json({ error: error.message, authenticated: false });
  }
};
