import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { calculate, parseNumber } from './src/calculator';

type Operation = 'add' | 'subtract';

export default function App() {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [operation, setOperation] = useState<Operation>('add');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function handleCalculate() {
    Keyboard.dismiss();
    const first = parseNumber(firstValue);
    const second = parseNumber(secondValue);

    if (first === null || second === null) {
      setResult(null);
      setError('Digite dois números válidos para continuar.');
      return;
    }

    setError('');
    setResult(calculate(first, second, operation));
  }

  function updateOperation(nextOperation: Operation) {
    setOperation(nextOperation);
    setResult(null);
    setError('');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#f4f6fb" />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.brandMark}><Text style={styles.brandMarkText}>±</Text></View>
            <Text style={styles.eyebrow}>POC · REACT NATIVE</Text>
            <Text style={styles.title}>Calculadora</Text>
            <Text style={styles.subtitle}>Uma conta simples, direto ao ponto.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>PRIMEIRO NÚMERO</Text>
            <TextInput
              accessibilityLabel="Primeiro número"
              style={styles.input}
              value={firstValue}
              onChangeText={setFirstValue}
              keyboardType="decimal-pad"
              placeholder="Ex.: 12"
              placeholderTextColor="#a3acbb"
              returnKeyType="next"
            />

            <Text style={[styles.label, styles.secondLabel]}>OPERAÇÃO</Text>
            <View style={styles.operationSwitch}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: operation === 'add' }}
                onPress={() => updateOperation('add')}
                style={[styles.operationButton, operation === 'add' && styles.operationButtonActive]}
              >
                <Text style={[styles.operationSymbol, operation === 'add' && styles.operationTextActive]}>＋</Text>
                <Text style={[styles.operationText, operation === 'add' && styles.operationTextActive]}>Somar</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: operation === 'subtract' }}
                onPress={() => updateOperation('subtract')}
                style={[styles.operationButton, operation === 'subtract' && styles.operationButtonActive]}
              >
                <Text style={[styles.operationSymbol, operation === 'subtract' && styles.operationTextActive]}>−</Text>
                <Text style={[styles.operationText, operation === 'subtract' && styles.operationTextActive]}>Subtrair</Text>
              </Pressable>
            </View>

            <Text style={[styles.label, styles.secondLabel]}>SEGUNDO NÚMERO</Text>
            <TextInput
              accessibilityLabel="Segundo número"
              style={styles.input}
              value={secondValue}
              onChangeText={setSecondValue}
              keyboardType="decimal-pad"
              placeholder="Ex.: 5"
              placeholderTextColor="#a3acbb"
              returnKeyType="done"
              onSubmitEditing={handleCalculate}
            />

            <Pressable accessibilityRole="button" onPress={handleCalculate} style={styles.calculateButton}>
              <Text style={styles.calculateButtonText}>Calcular</Text>
              <Text style={styles.calculateArrow}>→</Text>
            </Pressable>

            {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}

            {result !== null ? (
              <View accessibilityLiveRegion="polite" style={styles.resultBox}>
                <Text style={styles.resultLabel}>RESULTADO</Text>
                <Text style={styles.resultValue}>{new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 8 }).format(result)}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.footer}>Aceita vírgula ou ponto como separador decimal</Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f6fb' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 28 },
  header: { alignItems: 'center', marginBottom: 28 },
  brandMark: { width: 54, height: 54, borderRadius: 18, backgroundColor: '#e3e9ff', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  brandMarkText: { color: '#4358d8', fontSize: 30, fontWeight: '700' },
  eyebrow: { color: '#68748a', fontSize: 11, fontWeight: '700', letterSpacing: 1.8 },
  title: { color: '#182238', fontSize: 32, fontWeight: '800', marginTop: 6 },
  subtitle: { color: '#758096', fontSize: 15, marginTop: 6 },
  card: { backgroundColor: '#ffffff', borderRadius: 24, padding: 22, shadowColor: '#263454', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 4 },
  label: { color: '#65718a', fontSize: 11, fontWeight: '700', letterSpacing: 1.1, marginBottom: 9 },
  secondLabel: { marginTop: 21 },
  input: { height: 56, borderWidth: 1, borderColor: '#e4e8f0', borderRadius: 14, backgroundColor: '#fbfcfe', paddingHorizontal: 16, color: '#182238', fontSize: 18, fontWeight: '600' },
  operationSwitch: { flexDirection: 'row', backgroundColor: '#f1f3f8', borderRadius: 14, padding: 4, gap: 4 },
  operationButton: { flex: 1, minHeight: 48, borderRadius: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  operationButtonActive: { backgroundColor: '#4358d8', shadowColor: '#4358d8', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 7, elevation: 2 },
  operationSymbol: { fontSize: 20, color: '#6d7890', fontWeight: '600' },
  operationText: { color: '#59657c', fontSize: 14, fontWeight: '700' },
  operationTextActive: { color: '#ffffff' },
  calculateButton: { height: 56, marginTop: 24, borderRadius: 15, backgroundColor: '#4358d8', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  calculateButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  calculateArrow: { color: '#ffffff', fontSize: 20, fontWeight: '600' },
  error: { color: '#bd3d4a', fontSize: 13, marginTop: 12, textAlign: 'center' },
  resultBox: { marginTop: 18, backgroundColor: '#f2f5ff', borderRadius: 15, paddingVertical: 15, paddingHorizontal: 17, alignItems: 'center' },
  resultLabel: { color: '#6877bd', fontSize: 10, fontWeight: '700', letterSpacing: 1.4 },
  resultValue: { color: '#293caa', fontSize: 30, fontWeight: '800', marginTop: 4 },
  footer: { color: '#929bad', textAlign: 'center', fontSize: 12, marginTop: 19 },
});
