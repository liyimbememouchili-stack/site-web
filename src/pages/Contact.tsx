import { useState } from "react";
import { z } from "zod";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(5).max(2000),
});

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error("Veuillez remplir correctement le formulaire."); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success("Merci ! Votre message a bien été envoyé.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 700);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre projet de formation"
        description="Une question sur un programme, un devis pour votre équipe ou un partenariat ? Notre équipe vous répond sous 24h."
      />
      <section className="container py-16 grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          {[
            { icon: Mail, title: "Email", value: "contact@academie-dci.com" },
            { icon: Phone, title: "Téléphone / WhatsApp", value: "+237 6 00 00 00 00" },
            { icon: MapPin, title: "Adresses", value: "Yaoundé (Cameroun) • Dakar (Sénégal) • 100% en ligne" },
          ].map((c) => (
            <Card key={c.title} className="p-5 flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-gold shrink-0">
                <c.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{c.title}</div>
                <div className="font-semibold text-sm text-primary">{c.value}</div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-7 lg:col-span-2">
          <h2 className="font-display font-bold text-xl mb-5 text-primary">Envoyez-nous un message</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={100} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={255} />
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Sujet</Label>
              <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required maxLength={150} />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required maxLength={2000} />
            </div>
            <Button variant="hero" size="lg" disabled={loading}>
              <Send className="h-4 w-4" /> {loading ? "Envoi..." : "Envoyer le message"}
            </Button>
          </form>
        </Card>
      </section>
    </>
  );
};

export default Contact;
