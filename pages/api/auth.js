import { supabase } from '../../utils/supabaseinit';

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res);
}
