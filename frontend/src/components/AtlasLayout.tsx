// Import du thème
import theme from '../styles/theme';

// Application du thème à l'interface utilisateur
function AtlasLayout() {
  return (
    <div style={{
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
    }}>
      {/* Contenu de l'interface utilisateur */}
    </div>
  );
}

export default AtlasLayout;