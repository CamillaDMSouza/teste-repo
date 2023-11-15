# PO Requests:

### (06-11-2023)

* Sugiro que organizem com especial cuidado o vosso trabalho neste sprint. Em particular devem pensar no que necessitam ter a funcionar para todas as US individuais: a página de estatísticas. 

* Mesmo que esta não tenha nada, é um ponto fundamental para cada US, pois os testes de aceitação vão ter por base essa página. Depois, cada um deve aplicar o processo de engenharia para a sua funcionalidade, não esquecendo a parte dos requisitos e critérios de aceitação, que vão depois dar origem aos testes de aceitação. Os testes de aceitação começam sempre por falhar.
	
* Isto é uma ótima preparação para a prova de avaliação do dia 22, pois obriga a que todos passem por todas as componentes do processo de engenharia. É possível que cheguem ao fim do sprint sem terem tudo pronto. Faz parte do processo. O projeto não termina neste sprint. Seguem-se outros e o que não está fechado num sprint pode passar para outro.
	
* **Estava a imaginar o botão na página inicial mas apenas visível para utilizadores autenticados.**

* **Questions:**
>* O botão para a nova página de estatísticas, é na página inicial, ou na profile page?
>* Se for na página inicial, deve ser visível para todos ou só membros registados?

* **Reply:**

>* Estava a imaginar o botão na página inicial mas apenas visível para utilizadores autenticados

<hr>

### (07-11-2023)

* **Questions:**

>* Tendo em conta o comentário que fez uma vez que estatísticas deveriam estar separadas, devemos criar um novo module, por exemplo: "statistics", tal como temos o users e forum, ou usamos um destes já existentes?
>*  Em relação às Us 1 e 2, em relação à média, qd diz que quer a média de comments/posts num dia, refere-se à média total até à data, ou à média de determinado utilizador?
>*  Na US 6, a percentagem refere-se aos posts criados naquele dia específico?
>* Ainda em relação ao botão, deseja que ele fique no cabeçalho em geral, como o botão Profile/Logout, (dentro da classe Header container) ou especificamente dentro do elemento Header(que está dentro da classe header container), ao lado do "submit", por exemplo? 

* **Reply:**
>* Tendo em conta o comentário que fez uma vez que estatísticas deveriam estar separadas, devemos criar um novo module, por exemplo: "statistics", tal como temos o users e forum, ou usamos um destes já existentes?

>* Como PO não tenho uma opinião formada sobre o assunto. É uma questão de desenho da solução...
 
>* Em relação às Us 1 e 2, em relação à média, qd diz que quer a média de comments/posts num dia, refere-se à média total até à data, ou à média de determinado utilizador?
Talvez isso não tenha ficado claro no texto. O que se pretende é saber, em média, quantos comentários ou posts foram feitos por utilizador num determinado dia.
 
>* Na US 6, a percentagem refere-se aos posts criados naquele dia específico?
Sim, a percentagem de posts que não tiveram nenhum comentário para um determinado dia
 

>* Ainda em relação ao botão, deseja que ele fique no cabeçalho em geral, como o botão Profile/Logout, (dentro da classe Header container) ou especificamente dentro do elemento Header(que está dentro da classe header container), ao lado do "submit", por exemplo?

>* Como PO também não consigo responder diretamente a essa questão pois refere-se a opções da solução. Do ponto de vista funcional pretendia que essa "opção" estivesse presente no cabeçalho da página, tal como está o Login/Registo.
 
* **Questions:**
 
>* **Novas Statistic Funcionalities:**

>>* Ao nível da UI na página de "Statistics" gostaria de ver o layout da página com uma ordenação sequencial das pela ordem apresentada no enunciado deste Sprint? Ou tem outra preferência na disposição das mesmas? e se sim, qual?
 
>* **Documentação "Acceptance Tests":**

>>* A documentação dos testes funcionais, deverá ser tratada do mesmo modo que temos feito para os testes unitários / integração / regressão?

>>* Ou este tipo de testes em específico requerem um documentação diferenciada para apresentar "ao cliente"

* **Reply:**

>* Ao nível da UI na página de "Statistics" gostaria de ver o layout da página com uma ordenação sequencial das pela ordem apresentada no enunciado deste Sprint? Ou tem outra preferência na disposição das mesmas? e se sim, qual?

>>* **Sim, pode ser (mas pode ser outra).**

>* A documentação dos testes funcionais, deverá ser tratada do mesmo modo que temos feito para os testes unitários / integração / regressão?

>* Ou este tipo de testes em específico requerem um documentação diferenciada para apresentar "ao cliente"

>>* **Sobre este tema gostaria de ver o Gherkin de todos os testes de aceitação incluido na documentação.**

<br>

* **Questions:**

>* Para as diferentes funcionalidades, seria da intenção do PO para as funcionalidades que envolvam a inserção do mesmo campo, imaginemos "data", essas mesmas funcionalidades atualizarem ao mesmo tempo, ou pretende a inserção independente da data em cada uma das funcionalidades para pesquisas independentes?
 
* **Reply:**

>* Bom dia Sandro Filipe Ferreira Dos Santos. A ideia para as US individuais é que cada US tenha a sua área na página de estatística que deve ser totalmente independente das outras. Ou seja, deve conter tudo o que seja necessário para a sua funcionalidade e não depender das outras áreas/secções da página. General