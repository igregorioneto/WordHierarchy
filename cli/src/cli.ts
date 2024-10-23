import { Command } from "commander";
import { measureExecutationTime } from "./shared/utils/measureExecutationTime";
import { loaderParameters } from "./shared/utils/loaderParameters";

const program = new Command();

program
  .name('cli')
  .description('Um cli para análise de hierarquia de palavras')
  .version('1.0.0');

program
  .command('analyze')
  .description('Inicial para análise')
  .option('--depth <n>', 'Nível de profundidade da árvore para o qual exibir a contagem', '1')
  .option('--verbose', 'Caso seja informado deve exibir uma tabela no stdout com as seguintes métricas: Tempo de carregamento (ms) e Tempo de verificação (ms)')
  .argument('<phrase>', 'Frase a ser analisada')
  .action((phrase: string, options: any) => {
    console.log('Phrase: ', phrase)

    const depth = options.depth;
    console.log('Nível da pesquisa: ', depth);

    const metrics: { [key: string]: string } = {};
    if (options.verbose) {
      const loadTime = measureExecutationTime(() => loaderParameters(50));
      metrics['Tempo de carregamento dos parâmetros'] = `${loadTime}ms`;
      console.table(metrics);
    }
  })
program.parse(process.argv);