<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">
          {{ formData.formTitle }}
        </h6>
        <button
          class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          @click="renderMath"
        >
          Settings
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-2">
      <form>
        <div v-for="(section, index) in formData.formSections" :key="`section-${index}`" class="relative w-full mb-3">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            {{ section.section }}
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4" v-for="(field, fieldIndex) in section.fields" :key="`field-${index}-${fieldIndex}`">
              <div class="relative w-full mb-3">

                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" :for="field.name">
                  {{ field.label }}
                  <span v-if="field.type === 'math'">(Latex)</span>
                </label>

                <input v-if="field.type === 'text' || field.type === 'number'"
                  :type="field.type"
                  :id="field.name"
                  :name="field.name"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  :class="{ math: field.type === 'math math-input' }"
                  v-model="inputs[field.name]"
                  :step="field.type === 'number' ? '0.01' : null"
                  :required="field.required"
                />

                <input v-if="field.type === 'math'"
                  type='text'
                  :id="field.name"
                  :name="field.name"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 math math-input"
                  v-model="inputs[field.name]"

                  :required="field.required"
                />

                <!-- Un div donde se le muestra botones con operaciones basicas para añadir a la ecuacion -->
                <div v-if="field.type === 'math'" class="py-3">
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mb-0 lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click="inputs[field.name] += ' + '">+</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mb-0 lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click="inputs[field.name] += ' - '">-</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mb-0 lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click="inputs[field.name] += ' \\times '">x</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mb-0 lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click="inputs[field.name] += ' \\div '">/</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mb-0 lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click="inputs[field.name] += ' ^ '">^</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mb-0 lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click="inputs[field.name] += ' \\sqrt{} '">√</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mb-0 lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click="inputs[field.name] += ' \\rightarrow '">→</button>
                  <button class="duration-150 ease-linear font-bold hover:shadow-lg lg:mb-0 lg:mr-1 mb-3 ml-3 px-4 py-2 rounded shadow text-xs transition-all uppercase" @click="inputs[field.name] += ' \\frac{}{} '">a/b</button>
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
                    <option selected disabled>Choose an option</option>
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
            type="button"
            @click="sendForm"
          >
            Simular
          </button>
        </div>
      </form>
    </div>
    <div>
      <div class="flex flex-wrap">
        <div class="w-full mb-12 xl:mb-0 p-14">
          <card-line-graph
            v-if="!isEmpty(results.chartData)"
            :chartData="results.chartData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import katex from 'katex';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
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
        dataColors: ["#4c51bf", "#f3a4b5", "#f6ad55", "#2dce89"],
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

        // Parse the chemical reaction
        const reaction = this.inputs.chemical_reaction.replace(/\\rightarrow/g, '->'); // Replace latex arrow with '->'
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



        const base_url = process.env.VUE_APP_BACKEND_URL;
        const url = `${base_url}/api/v1/test`;

        const reactorData = {
          RT: this.inputs.reactor_type === 'pfr' ? 2 : 1,
          FNV: Number(this.inputs.fnv),
          VT: Number(this.inputs.vt),
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
          // rA: this.inputs.reaction_rate_equation,
          ti: Number(this.inputs.initial_time),
          tf: Number(this.inputs.final_time),
          CEq: this.inputs.custom_equation,
          pd_eq: this.inputs.pressure_drop || false,
          td_eq: this.inputs.temperature_drop || false,
        };

        this.results.chartData = {};

        axios.post(url, reactorData, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
          this.results.chartData = {
            title: 'Reactor Data',
            labels: response.data.labels,
            mainLabels: response.data.mainLabels,
            xAxis: response.data.xAxis,
            datasets: response.data.data.map((data, index) => ({
              label: response.data.labels[index],
              data: data.map(d => d[1]),
              fill: false,
              borderColor: this.dataColors[index],
              backgroundColor: this.dataColors[index],
            })),
          };
        })
        .catch((error) => {
          console.error(error);
        });
      }
    },
  }
</script>