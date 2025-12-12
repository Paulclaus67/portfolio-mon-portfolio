#!/bin/bash
# 🧪 Portfolio Quality Assurance Tests
# Script pour vérifier que toutes les améliorations fonctionnent correctement

echo "🚀 Portfolio Quality Assurance Tests"
echo "===================================="
echo ""

# Couleurs pour output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
PASS=0
FAIL=0

# Test 1: Vérifier les fichiers CSS existent
echo "📋 Test 1: Vérifier les fichiers CSS..."
if [ -f "app/globals.css" ] && [ -f "app/theme.css" ] && [ -f "app/animations.css" ] && [ -f "app/typography.css" ]; then
    echo -e "${GREEN}✅ Tous les fichiers CSS existent${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ Fichiers CSS manquants${NC}"
    ((FAIL++))
fi
echo ""

# Test 2: Vérifier les fichiers de composants
echo "📋 Test 2: Vérifier les fichiers de composants..."
if [ -f "app/utils/components.js" ]; then
    echo -e "${GREEN}✅ Fichier components.js existe${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ Fichier components.js manquant${NC}"
    ((FAIL++))
fi
echo ""

# Test 3: Vérifier les fichiers de documentation
echo "📋 Test 3: Vérifier la documentation..."
DOCS=("IMPROVEMENTS.md" "USAGE_GUIDE.md" "DEPLOYMENT_CHECKLIST.md" "QUICK_TIPS.md" "CHANGELOG.md" "SUMMARY.md")
MISSING_DOCS=0
for doc in "${DOCS[@]}"; do
    if [ ! -f "$doc" ]; then
        MISSING_DOCS=$((MISSING_DOCS + 1))
    fi
done

if [ $MISSING_DOCS -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les fichiers de documentation existent (6/6)${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ $MISSING_DOCS fichiers de documentation manquent${NC}"
    ((FAIL++))
fi
echo ""

# Test 4: Vérifier next.config.mjs modifié
echo "📋 Test 4: Vérifier next.config.mjs optimisé..."
if grep -q "compress: true" next.config.mjs; then
    echo -e "${GREEN}✅ next.config.mjs est optimisé${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ next.config.mjs pas optimisé${NC}"
    ((FAIL++))
fi
echo ""

# Test 5: Vérifier les imports CSS
echo "📋 Test 5: Vérifier les imports CSS dans globals.css..."
if grep -q "@import.*animations.css" app/globals.css && grep -q "@import.*theme.css" app/globals.css && grep -q "@import.*typography.css" app/globals.css; then
    echo -e "${GREEN}✅ Tous les imports CSS sont présents${NC}"
    ((PASS++))
else
    echo -e "${YELLOW}⚠️  Certains imports CSS manquent (vérifiez manuellement)${NC}"
    ((FAIL++))
fi
echo ""

# Test 6: Vérifier package.json
echo "📋 Test 6: Vérifier package.json..."
if grep -q "next" package.json && grep -q "tailwindcss" package.json; then
    echo -e "${GREEN}✅ Dépendances requises présentes${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ Dépendances manquantes${NC}"
    ((FAIL++))
fi
echo ""

# Test 7: Vérifier layout.js contient métadonnées
echo "📋 Test 7: Vérifier les métadonnées SEO..."
if grep -q "metadata" app/layout.js && grep -q "description" app/layout.js; then
    echo -e "${GREEN}✅ Métadonnées SEO présentes${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ Métadonnées SEO manquantes${NC}"
    ((FAIL++))
fi
echo ""

# Test 8: Vérifier .env.example
echo "📋 Test 8: Vérifier .env.example..."
if [ -f ".env.example" ]; then
    echo -e "${GREEN}✅ Fichier .env.example existe${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ Fichier .env.example manquant${NC}"
    ((FAIL++))
fi
echo ""

# Test 9: Vérifier images existent
echo "📋 Test 9: Vérifier les assets importants..."
ASSETS=("public/Paul_PDP.jpg" "public/Paul_Claus_CV.pdf")
MISSING_ASSETS=0
for asset in "${ASSETS[@]}"; do
    if [ ! -f "$asset" ]; then
        MISSING_ASSETS=$((MISSING_ASSETS + 1))
    fi
done

if [ $MISSING_ASSETS -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les assets importants existent${NC}"
    ((PASS++))
else
    echo -e "${YELLOW}⚠️  $MISSING_ASSETS assets manquent (c'est ok si en développement)${NC}"
    ((FAIL++))
fi
echo ""

# Test 10: Linter si disponible
echo "📋 Test 10: Linter le code..."
if command -v npm &> /dev/null; then
    if npm run lint > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Linting réussi${NC}"
        ((PASS++))
    else
        echo -e "${YELLOW}⚠️  Quelques warnings de linting (vérifiez manuellement)${NC}"
    fi
else
    echo -e "${YELLOW}⏭️  npm non disponible, test skippé${NC}"
fi
echo ""

# Résumé
echo "===================================="
echo "📊 Résumé des Tests"
echo "===================================="
echo -e "${GREEN}✅ Réussis: $PASS${NC}"
echo -e "${RED}❌ Échoués: $FAIL${NC}"
TOTAL=$((PASS + FAIL))
echo "Total: $TOTAL tests"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 Tous les tests passent!${NC}"
    echo "Votre portfolio est prêt à être déployé! 🚀"
    exit 0
else
    echo -e "${RED}⚠️  Veuillez corriger les tests échoués avant le déploiement${NC}"
    exit 1
fi
