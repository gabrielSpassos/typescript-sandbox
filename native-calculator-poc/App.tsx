import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { calculate, parseNumber } from './src/calculator';
import { styles } from './src/styles';

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
