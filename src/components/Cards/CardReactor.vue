<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">
          {{ formData.formTitle }}
          <span class="uppercase" v-if="inputs.reactor_type !== 'default'">
            - {{ inputs.reactor_type }}&nbsp;
            <span v-if="inputs.variable_type !== 'default'">{{ inputs.variable_type }}</span>
          </span>
        </h6>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-2">
      <form>
        <div v-for="(section, index) in formData.formSections" :key="`section-${index}`" class="relative w-full mb-3">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            {{ section.section }}
          </h6>
          <div class="flex flex-wrap">
            <div
              :class="{
                'hidden': !showField(field),
                'lg:w-6/12': showField(field),
              }"
              class="w-full px-4" v-for="(field, fieldIndex) in section.fields" :key="`field-${index}-${fieldIndex}`"
            >
              <div class="relative w-full mb-4" v-if="showField(field)">

                <!-- Label -->
                <label class="block text-blueGray-600 text-xs font-bold mb-2" :for="field.name">
                  <span
                    v-if="field.type === 'select' || field.type === 'number' || field.type === 'math'"
                    class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-1"
                  >
                    <i
                      v-if="field.type === 'select'"
                      class="fas fa-bars"
                    ></i>
                    <i
                      v-if="field.type === 'number'"
                      class="fas fa-hashtag"
                    ></i>
                    <i
                      v-if="field.type === 'math'"
                      class="fas fa-calculator"
                    ></i>
                  </span>
                  {{ field.label }}
                </label>

                <!-- Para los tipos text y number -->
                <input v-if="field.type === 'text' || field.type === 'number'"
                  :type="field.type"
                  :id="field.name"
                  :name="field.name"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  :class="{ math: field.type === 'math math-input' }"
                  v-model="inputs[field.name]"
                  :step="field.type === 'number' ? '0.01' : null"
                  :placeholder="field.placeholder || field.type === 'number' ? '0.00' : '-- -- --'"
                  :required="field.required"
                />

                <!-- Para los tipos math -->
                <input v-if="field.type === 'math'"
                  type='text'
                  :id="field.name"
                  :name="field.name"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 math math-input"
                  v-model="inputs[field.name]"
                  :placeholder="field.placeholder || 'TeX Equation'"
                  :required="field.required"
                />

                <!-- Un div donde se le muestra botones con operaciones basicas para añadir a la ecuacion -->
                <div v-if="field.type === 'math'" class="py-3">
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click.prevent="inputs[field.name] += ' + '">+</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click.prevent="inputs[field.name] += ' - '">-</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click.prevent="inputs[field.name] += ' \\times '">x</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click.prevent="inputs[field.name] += ' \\div '">/</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click.prevent="inputs[field.name] += ' ^ '">^</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click.prevent="inputs[field.name] += ' \\sqrt{} '">√</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click.prevent="inputs[field.name] += ' \\rightarrow '">→</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click.prevent="inputs[field.name] += ' \\frac{}{} '">a/b</button>
                </div>

                <!-- Un div (visible) donde se renderiza la ecuacion a Latex -->
                <div v-if="field.type === 'math'" class="py-3" :class="`math-latex-render-${field.name}`"></div>


                <select v-if="field.type === 'select'"
                  :id="field.name"
                  :name="field.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="inputs[field.name]"
                  :required="field.required"
                >
                    <option selected disabled value="default">Choose an option</option>
                    <option v-for="(option, index) in field.options" :value="option.value" :key="index" :disabled="option.disabled">{{ option.label }}</option>
                </select>

                <!-- Para los tipos checkbox -->
                <div v-if="field.type === 'checkbox'" class="py-3">
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      :id="field.name"
                      :name="field.name"
                      type="checkbox"
                      class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      v-model="inputs[field.name]"
                      :required="field.required"
                    />
                    <span class="ml-2 text-sm font-semibold text-blueGray-600">
                      {{ field.label }}
                    </span>
                  </label>
                </div>

              </div>
            </div>
          </div>
          <div v-if="index !== formData.formSections.length - 1">
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
        </div>
        <div class="text-center mt-6 py-6">
          <button
            class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            :class="{ 'cursor-not-allowed opacity-50 pointer-events-none': loadingResults.isLoading }"
            type="button"
            @click="sendForm"
          >
            <!-- <img v-if="loadingResults.isLoading" src="/loading.gif" alt="Loading..." class="h-5 inline-block" /> -->
            <img v-if="loadingResults.isLoading" :src="loadingResults.image" alt="Loading..." class="h-5 inline-block" />
            <span v-else>Simular</span>
          </button>
        </div>
      </form>
    </div>
    <div>
      <!-- <div class="flex flex-wrap"> -->
        <div class="w-full mb-12 p-14" v-if="!isEmpty(results.chartData)">
          <div v-for="(result, index) in results.chartData" :key="`result-${index}`">
            <card-line-graph
              :chartData="result"
            />
          </div>

          <!-- <card-line-graph
            v-if="!isEmpty(results.chartData)"
            :chartData="results.chartData[0]"
          /> -->
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import katex from 'katex';
import axios from 'axios';


import CardLineGraph from "@/components/Cards/CardLineGraph.vue";

export default {
  components: {
    CardLineGraph
  },
    props: {
      formData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        inputs: {}, // Store the form inputs
        results: {
          chartData: {},
        },
        dataColors: ["#4c51bf", "#f3a4b5", "#f6ad55", "#2dce89", "#11cdef", "#2b59b6"],
        loadingResults: {
          isLoading: false,
          image: '/loading.gif',
        }
      };
    },
    created() {
      // for each input in formData, add it to the inputs object
      this.formData.formSections.forEach((section) => {
        section.fields.forEach((field) => {
          this.inputs[field.name] = field.default || '';
        });
      });

      // render the math with a two second delay
      setTimeout(() => {
        this.renderMath();
      }, 2000);
    },
    watch: {
      inputs: {
        handler() {
          this.renderMath();
        },
        deep: true,
      },
    },
    methods: {
      isEmpty(obj) {
        for(let key in obj) {
          if(Object.prototype.hasOwnProperty.call(obj, key))
            return false;
        }
        return true;
      },
      renderMath() {
        document.querySelectorAll('.math').forEach((el) => {
            katex.render(el.value, document.querySelector(`.math-latex-render-${el.name}`), {
                displayMode: true,
                output: 'mathml',
                throwOnError: false,
            });
        });
      },
      sendForm() {

        this.loadingResults.isLoading = true;

        // Parse the chemical reaction
        const reaction = this.inputs.chemical_reaction.replace(/\\rightarrow/g, '->'); // Replace latex arrow with '->'
        const stoichiometricCoefficients = this.getStoichiometricCoefficients(reaction);


        const base_url = process.env.VUE_APP_BACKEND_URL;
        const url = `${base_url}/reactores`;

        const reactorData = {
          RT: this.getReactorType(),
          FT0: Number(this.inputs.ft0),
          NT0: Number(this.inputs.nt0),
          V: Number(this.inputs.vt),
          P0: Number(this.inputs.intial_pressure),
          T0: Number(this.inputs.intial_temperature),
          yA0: Number(this.inputs.initial_molar_fraction_A),
          yB0: Number(this.inputs.initial_molar_fraction_B),
          yC0: Number(this.inputs.initial_molar_fraction_C),
          yD0: Number(this.inputs.initial_molar_fraction_D),
          yI: Number(this.inputs.inactive_fraction),
          a: (stoichiometricCoefficients.a * (-1)) || -1,
          b: (stoichiometricCoefficients.b * (-1)) || -0.5,
          c: (stoichiometricCoefficients.c) || 1,
          d: (stoichiometricCoefficients.d) || 0,
          EA: Number(this.inputs.ea),
          A: Number(this.inputs.a),
          ra: this.inputs.reaction_rate_equation,
          CA: this.inputs.partial_equation_ca,
          CB: this.inputs.partial_equation_cb,
          CC: this.inputs.partial_equation_cc,
          CD: this.inputs.partial_equation_cd,
          ti: Number(this.inputs.initial_time),
          tf: Number(this.inputs.final_time),
          CEq: this.inputs.custom_equation,
          caidaPresion: this.inputs.pressure_drop || false,
          caidaTemperatura: this.inputs.temperature_drop || false,
          dP: this.inputs.dP_equation,
          dT: this.inputs.dT_equation,
          CpA: Number(this.inputs.heat_capacity_A),
          CpB: Number(this.inputs.heat_capacity_B),
          CpC: Number(this.inputs.heat_capacity_C),
          CpD: Number(this.inputs.heat_capacity_D),
          HAref: Number(this.inputs.enthalpy_A),
          HBref: Number(this.inputs.enthalpy_B),
          HCref: Number(this.inputs.enthalpy_C),
          HDref: Number(this.inputs.enthalpy_D),
          Tref: Number(this.inputs.reference_temperature),
        };

        this.results.chartData = [];

        axios.post(url, reactorData, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
          // if response.data.labels length is 3 or less,
          if (response.data.labels.length <= 3) {
            // for each label in response.data.labels
            response.data.labels.forEach((label, index) => {
              this.results.chartData[index] = {
                id: index,
                title: 'Resultado de la simulación para ' + label,
                labels: [label],
                mainLabels: response.data.main_labels,
                xAxis: response.data.xAxis,
                datasets: [{
                  label: label,
                  data: response.data.data[index].map(d => d[1]),
                  fill: false,
                  borderColor: this.dataColors[index],
                  backgroundColor: this.dataColors[index],
                }]
              };
            })
          }
          else {
            // Print the first four into one
            // And the last two separately
            this.results.chartData[0] = {
              id: 0,
              title: 'Resultado de la simulación para ' + response.data.labels.slice(0, 4).join(', '),
              labels: response.data.labels.slice(0, 4),
              mainLabels: response.data.main_labels,
              xAxis: response.data.xAxis,
              datasets: response.data.data.slice(0, 4).map((data, index) => ({
                label: response.data.labels[index],
                data: data.map(d => d[1]),
                fill: false,
                borderColor: this.dataColors[index],
                backgroundColor: this.dataColors[index],
              }))
            };
            // For 'P'
            this.results.chartData[1] = {
              id: 1,
              title: 'Resultado de la simulación para ' + response.data.labels[4],
              labels: [response.data.labels[4]],
              mainLabels: response.data.main_labels,
              xAxis: response.data.xAxis,
              datasets: [{
                label: response.data.labels[4],
                data: response.data.data[4].map(d => d[1]),
                fill: false,
                borderColor: this.dataColors[4],
                backgroundColor: this.dataColors[4],
              }]
            };

            // For 'T'
            this.results.chartData[2] = {
              id: 2,
              title: 'Resultado de la simulación para ' + response.data.labels[5],
              labels: [response.data.labels[5]],
              mainLabels: response.data.main_labels,
              xAxis: response.data.xAxis,
              datasets: [{
                label: response.data.labels[5],
                data: response.data.data[5].map(d => d[1]),
                fill: false,
                borderColor: this.dataColors[5],
                backgroundColor: this.dataColors[5],
              }]
            };
          }

          // this.loadingResults.isLoading = false;
          // Show loading image at least 1 second(s)
          setTimeout(() => {
            this.loadingResults.isLoading = false;
          }, 1000);

          // this.results.chartData = {
          //   title: 'Reactor Data',
          //   labels: response.data.labels,
          //   mainLabels: response.data.main_labels,
          //   xAxis: response.data.xAxis,
          //   datasets: response.data.data.map((data, index) => ({
          //     label: response.data.labels[index],
          //     data: data.map(d => d[1]),
          //     fill: false,
          //     borderColor: this.dataColors[index],
          //     backgroundColor: this.dataColors[index],
          //   })),
          // };
        })
        .catch((error) => {
          console.error(error);
          this.loadingResults.image = '/warning.webp';
        });
      },
      getStoichiometricCoefficients(reaction) {
        const [reactants, products] = reaction.split('->').map(s => s.trim());
        const reactantsArr = reactants.split('+').map(s => s.trim());
        const productsArr = products.split('+').map(s => s.trim());

        const stoichiometricCoefficients = {};

        reactantsArr.forEach(reactant => {
          // if length is 1, then the coefficient is 1
          // if not, the species is the latest element, and the rest is the coefficient
          if (reactant.length === 1) {
            stoichiometricCoefficients[reactant] = 1;
          } else {
            const species = reactant[reactant.length - 1];
            const coefficient = reactant.slice(0, reactant.length - 1);
            // if the coefficient is a fraction [\\frac{a}{b}], then evaluate it
            if (coefficient.includes('\\frac')) {
              const [a, b] = coefficient.match(/\d+/g).map(Number);
              stoichiometricCoefficients[species] = a / b;
            } else {
              stoichiometricCoefficients[species] = Number(coefficient);
            }
          }
        });

        productsArr.forEach(product => {
          // if length is 1, then the coefficient is 1
          // if not, the species is the latest element, and the rest is the coefficient
          if (product.length === 1) {
            stoichiometricCoefficients[product] = 1;
          } else {
            const species = product[product.length - 1];
            const coefficient = product.slice(0, product.length - 1);
            // if the coefficient is a fraction [\\frac{a}{b}], then evaluate it
            if (coefficient.includes('\\frac')) {
              const [a, b] = coefficient.match(/\d+/g).map(Number);
              stoichiometricCoefficients[species] = a / b;
            } else {
              stoichiometricCoefficients[species] = Number(coefficient);
            }
          }
        });

        return stoichiometricCoefficients;
      },
      getReactorType() {
        // 0: PFR flux
        // 1: PFR conversion
        // 2: PBR flux
        // 3: PBR conversion
        // 4: Batch flux
        // 5: Batch conversion

        switch (this.inputs.reactor_type) {
          case 'pfr':
            return this.inputs.variable_type === 'flux' ? 0 : 1;
          case 'pbr':
            return this.inputs.variable_type === 'flux' ? 2 : 3;
          case 'batch':
            return this.inputs.variable_type === 'flux' ? 4 : 5;
          default:
            return -1;
        }
      },
      // showField(field) {
      //   if (!field.showIf) {
      //     return true;
      //   }
      //   return field.showIf.every(condition => this.evalCondition(condition));
      // },
      // evalCondition(condition) {
      //   if (condition.or) {
      //     return this.inputs[condition.field] === condition.value || this.evalCondition(condition.or)
      //   }
      //   return this.inputs[condition.field] === condition.value;
      // },
      showField(field) {
        return field.showIf?.every(condition => this.evalCondition(condition)) ?? true;
      },
      evalCondition(condition) {
        return this.inputs[condition.field] === condition.value || condition.or && this.evalCondition(condition.or);
      },
    },
  }
</script>