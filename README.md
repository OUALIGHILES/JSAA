# 🎫 JSK Ticket Reservation Backend

Ce dépôt contient le **backend** complet pour une plateforme de réservation de billets de matchs de la JSK, développé avec **Django** et **Django REST Framework**.

---

## 🚀 Structure du projet

```
jsk/
│
├── authentication/
│   ├── models.py (CustomUser)
│   ├── views.py, urls.py, serializers.py, forms.py, templates/
│
├── match_future/
│   ├── models.py (Stadium, Section, TicketCategory, Match)
│   ├── views.py, urls.py, templates/
│
├── stadium_info/
│   ├── models.py (Stadium, Section, SeatMap)
│   ├── views.py, urls.py, templates/
│
├── reservation/
│   ├── models.py (Seat, Reservation, ReservationItem)
│   ├── views.py, urls.py, serializers.py, templates/
│
├── payment/
│   ├── models.py (Payment, CardInfo)
│   ├── views.py, urls.py, serializers.py, templates/
│
├── tickets/
│   ├── models.py (Ticket)
│   ├── views.py, urls.py, templates/
│
├── api/
│   ├── urls.py (centralise tous les endpoints API)
│   ├── views.py, serializers.py
│
├── static/ (CSS, JS, images)
├── media/ (fichiers uploadés: tickets PDF, images...)
├── templates/ (base.html + templates globales)
│
├── jsk/ (fichiers principaux Django: settings.py, urls.py, wsgi.py, asgi.py)
├── manage.py
├── requirements.txt
└── .env (variables sensibles)
```

---

## 📚 Fonctionnalités principales

- **Gestion des utilisateurs** (inscription, connexion, profils).
- **Gestion des stades et sections**.
- **Gestion des matchs à venir**.
- **Réservation de billets avec expiration automatique et gestion de sièges**.
- **Paiement avec suivi du statut (success, failed)**.
- **Génération automatique des billets PDF + QR code**.
- **Endpoints API (REST) pour toutes les fonctionnalités**.

---

## ✅ Technologies utilisées

- Python 3
- Django
- Django REST Framework
- SQLite (par défaut, peut être remplacé par PostgreSQL / Supabase)
- Supabase (prévu pour stockage et base distante)
- HTML / CSS / Bootstrap (pour les templates)
- Qrcode / ReportLab (pour génération PDF et QR)

---

## 📦 Installation rapide

```bash
git clone https://github.com/OUALIGHILES/JSAA.git
cd jsk
python -m venv venv
source venv/bin/activate # ou venv\Scripts\activate sous Windows
pip install -r requirements.txt
cp .env.example .env # et configurez les variables
python manage.py migrate
python manage.py runserver
```

## 📡 API

Tous les endpoints API sont centralisés dans `api/urls.py`. Les principales routes :

- `/api/auth/` - Authentification
- `/api/matchs/` - Gestion des matchs
- `/api/reservations/` - Gestion des réservations
- `/api/payments/` - Paiement
- `/api/tickets/` - Tickets PDF & QR Code

## 🤝 Contribution

Si vous souhaitez contribuer, n'hésitez pas à faire un fork et proposer vos idées.

## 🟢 Auteur

Ce projet a été réalisé par OUALI GHILES dans le cadre d'un projet de réservation de billets pour la JSK.

## 📬 Contact

Pour toute question, contactez-moi sur GitHub ou par email.

⭐ N'oubliez pas de mettre un star ⭐ si vous aimez le projet !
