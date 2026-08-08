import { performance } from 'perf_hooks';

// Fonction pour tester la charge de l'application
async function testCharge() {
  const startTime = performance.now();
  // Appel à l'API de l'application
  const response = await fetch('https://atlas-g-market.herokuapp.com/api/marketplace');
  const endTime = performance.now();
  console.log(`Temps de chargement : ${endTime - startTime}ms`);
}

// Fonction pour tester la sécurité de l'application
async function testSecurite() {
  // Test de injection SQL
  const response = await fetch('https://atlas-g-market.herokuapp.com/api/marketplace', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      id: '1 OR 1=1'
    }
  });
  console.log(`Test de sécurité : ${response.status === 400 ? 'passed' : 'failed'}`);
}

// Exécution des tests
testCharge();
testSecurite();