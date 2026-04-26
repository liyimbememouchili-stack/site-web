import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const signupSchema = z.object({
  full_name: z.string().trim().min(2, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(8, "8 caractères minimum").max(72),
  phone: z.string().trim().max(30).optional(),
});

const Auth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(params.get("mode") === "signup" ? "signup" : "signin");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "", phone: "" });
  const redirect = params.get("redirect") || "/dashboard";

  useEffect(() => { if (user) navigate(redirect, { replace: true }); }, [user, navigate, redirect]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const parsed = signupSchema.safeParse(form);
        if (!parsed.success) {
          toast.error(parsed.error.errors[0].message);
          setLoading(false); return;
        }
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: form.full_name, phone: form.phone },
          },
        });
        if (error) throw error;
        toast.success("Compte créé ! Vous êtes connecté.");
        navigate(redirect, { replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
        if (error) throw error;
        toast.success("Bon retour parmi nous !");
        navigate(redirect, { replace: true });
      }
    } catch (err: any) {
      const m = err?.message || "Erreur";
      if (m.includes("already registered") || m.includes("User already")) toast.error("Cet email est déjà utilisé.");
      else if (m.includes("Invalid login")) toast.error("Email ou mot de passe incorrect.");
      else toast.error(m);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mb-4">
        <Button variant="ghost" size="sm" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </div>
      <Card className="w-full max-w-md p-8 shadow-elegant">
        <Link to="/" className="flex items-center justify-center gap-2 font-display font-bold text-lg mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg gradient-gold shadow-gold">
            <GraduationCap className="h-5 w-5 text-accent-foreground" />
          </span>
          <span><span className="text-primary">Académie</span><span className="text-accent">DCI</span></span>
        </Link>

        <div className="flex rounded-lg bg-secondary p-1 mb-6">
          <button onClick={() => setMode("signin")} className={`flex-1 py-2 text-sm font-medium rounded-md transition-smooth ${mode === "signin" ? "bg-card shadow-soft text-primary" : "text-muted-foreground"}`}>Connexion</button>
          <button onClick={() => setMode("signup")} className={`flex-1 py-2 text-sm font-medium rounded-md transition-smooth ${mode === "signup" ? "bg-card shadow-soft text-primary" : "text-muted-foreground"}`}>Inscription</button>
        </div>

        <h1 className="font-display font-bold text-2xl text-primary text-center mb-1">
          {mode === "signin" ? "Bon retour !" : "Créer mon compte"}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {mode === "signin" ? "Accédez à votre espace apprenant" : "Module 1 gratuit dès l'inscription"}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <Label htmlFor="full_name">Nom complet</Label>
                <Input id="full_name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required maxLength={100} />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone (facultatif)</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={30} />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={255} />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={mode === "signup" ? 8 : 1} maxLength={72} />
            {mode === "signup" && <p className="text-xs text-muted-foreground mt-1">8 caractères minimum.</p>}
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? "Se connecter" : "Créer mon compte"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          En continuant, vous acceptez les conditions d'utilisation de l'Académie DCI.
        </p>
      </Card>
      <Link to="/" className="mt-6 text-sm text-muted-foreground hover:text-primary transition-smooth">
        ← Retour à l'accueil
      </Link>
    </div>
  );
};

export default Auth;
