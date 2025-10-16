# Documentation API - Sauvegarde des Règles d'Horaires

## Vue d'ensemble

J'ai ajouté une fonctionnalité de sauvegarde API à votre générateur d'horaires. Voici comment cela fonctionne :

## Fichiers créés

### 1. `src/services/api.service.ts`
Service Angular qui gère les appels HTTP vers votre API backend.

**Méthodes disponibles :**

#### `saveScheduleRules(rules: ScheduleRule[], userId?: string): Observable<any>`
Sauvegarde les règles vers l'API.

**Paramètres :**
- `rules`: Tableau des règles d'horaires à sauvegarder
- `userId` (optionnel): Identifiant de l'utilisateur

**Exemple de payload envoyé :**
```json
{
  "rules": [
    {
      "id": 1697123456789,
      "dayPattern": {
        "type": "WEEKLY",
        "days": [false, true, true, true, true, true, false]
      },
      "timePattern": {
        "type": "TIME_RANGE",
        "timeSlots": [
          { "start": "08:00", "end": "14:00" }
        ]
      }
    }
  ],
  "timestamp": "2025-10-16T22:27:00.000Z",
  "userId": "optional-user-id"
}
```

#### `loadScheduleRules(userId?: string): Observable<any>`
Récupère les règles sauvegardées depuis l'API.

## Configuration actuelle

### API fictive (développement)
- **URL**: `https://jsonplaceholder.typicode.com/posts`
- Cette API retourne toujours un succès et simule une sauvegarde
- Utilisée uniquement pour les tests

### Pour utiliser votre vraie API

Dans `src/services/api.service.ts`, modifiez la ligne 16 :

```typescript
// Remplacez cette URL par votre API réelle
private readonly API_URL = 'https://votre-api.com/api/schedule-rules';
```

## Ajout d'authentification

Si votre API nécessite une authentification, décommentez et modifiez les lignes dans la méthode `saveScheduleRules` :

```typescript
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${votre_token_jwt}`
});
```

## Structure de réponse attendue

Votre API devrait retourner :

```json
{
  "success": true,
  "message": "Règles sauvegardées avec succès",
  "savedId": "abc123"
}
```

## Utilisation dans l'interface

1. Configurez vos règles d'horaires dans l'interface
2. Le résultat généré s'affiche dans le panneau de droite
3. Cliquez sur le bouton **"Sauvegarder vers l'API"**
4. Un indicateur de chargement apparaît pendant l'envoi
5. Un message de succès ou d'erreur s'affiche

## Statuts du bouton

- **Idle** (vert): Prêt à sauvegarder
- **Saving** (gris): Sauvegarde en cours avec spinner
- **Success** (vert foncé): Sauvegarde réussie ✓
- **Error** (rouge): Erreur lors de la sauvegarde ✗

## Gestion des erreurs

Le service gère automatiquement les erreurs réseau et affiche :
- Un message d'erreur clair à l'utilisateur
- Les détails dans la console du navigateur (F12)
- Un auto-reset après 5 secondes

## Console du navigateur

Pour voir les détails de la requête/réponse, ouvrez la console du navigateur (F12) :
- `console.log('Règles sauvegardées avec succès:', response)`
- `console.error('Erreur lors de la sauvegarde:', error)`

## Prochaines étapes recommandées

1. **Remplacez l'URL de l'API fictive** par votre vraie API
2. **Ajoutez l'authentification** si nécessaire
3. **Testez avec votre backend** pour vérifier la compatibilité
4. **Ajoutez la fonctionnalité de chargement** pour récupérer les règles sauvegardées
5. **Gérez les utilisateurs** si vous avez un système multi-utilisateurs

## Exemple d'intégration backend (Node.js/Express)

```javascript
app.post('/api/schedule-rules', async (req, res) => {
  try {
    const { rules, timestamp, userId } = req.body;
    
    // Sauvegardez dans votre base de données
    const savedRule = await db.scheduleRules.create({
      userId,
      rules: JSON.stringify(rules),
      timestamp
    });
    
    res.json({
      success: true,
      message: 'Règles sauvegardées avec succès',
      savedId: savedRule.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
```

## Support

Si vous avez besoin d'aide pour configurer votre API ou modifier le service, n'hésitez pas à demander !
