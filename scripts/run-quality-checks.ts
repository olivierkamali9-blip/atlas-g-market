import { execSync } from 'child_process';

console.log('=== ATLAS G-MARKET : EXECUTION DES VERIFICATIONS QUALITE ===\n');

try {
  console.log('[1/4] Validation de la syntaxe et du typage TypeScript...');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✓ Typage valide.\n');

  console.log('[2/4] Exécution des tests unitaires et d intégration...');
  execSync('npx jest tests/integration/features-validation.test.ts', { stdio: 'inherit' });
  console.log('✓ Tests d intégration validés.\n');

  console.log('[3/4] Exécution de la suite de validation de qualité...');
  execSync('npx jest tests/validation/quality-assurance.test.ts', { stdio: 'inherit' });
  console.log('✓ QA Globale validée.\n');

  console.log('[4/4] Vérification des performances et temps de réponse...');
  execSync('npx ts-node tests/performance/performance-test.ts', { stdio: 'inherit' });
  console.log('✓ Tests de charge validés.\n');

  console.log('🎉 TOUTES LES VÉRIFICATIONS DE QUALITÉ SONT SUCCÈS !');
} catch (error) {
  console.error('❌ ÉCHEC DE LA VALIDATION QUALITÉ :', error);
  process.exit(1);
}