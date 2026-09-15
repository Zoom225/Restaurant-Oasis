# Contribuer

Le développement suit une issue et une branche par sujet. La branche de destination est `main`.

## Branches

- Fonctionnalité : `feature/<issue>-<description>`
- Tests : `test/<issue>-<description>`
- Maintenance : `chore/<issue>-<description>`

## Commits

Utiliser les commits conventionnels : `feat:`, `fix:`, `test:`, `docs:`, `chore:` ou `refactor:`.

## Avant une pull request

```bash
npm run lint
npm run test -- --run
npm run build
```

La pull request doit référencer son issue, décrire les données modifiées et confirmer qu’aucune coordonnée non vérifiée n’est rendue publiquement.
