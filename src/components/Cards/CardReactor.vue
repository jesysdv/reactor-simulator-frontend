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
        >
          Settings
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-2">
      <form>
        <div v-for="(section, index) in formData.formSections" :key="`section-${index}`">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            {{ section.section }}
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4" v-for="(field, index) in section.fields" :key="`field-${index}-${fieldIndex}`">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" :for="field.name">
                  {{ field.label }}
                </label>
                <input v-if="field.type === 'text' || field.type === 'number'"
                  :type="field.type"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  :value="field.value"
                  :required="field.required"
                />
                <select v-if="field.type === 'select'"
                  :id="field.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  :required="field.required"
                >
                    <option selected disabled>Choose an option</option>
                    <option v-for="(option, index) in field.options" :value="option.value" :key="index" :disabled="option.disabled">{{ option.label }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
      <form>
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          User Information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Username
              </label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>

            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Username
              </label>
              <input
                type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="lucky.jesse"
              />

            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Email address
              </label>
              <input
                type="email"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="jesse@example.com"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                First Name
              </label>
              <input
                type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="Lucky"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Last Name
              </label>
              <input
                type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="Jesse"
              />
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300" />
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Contact Information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Address
              </label>
              <input
                type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
              />
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                City
              </label>
              <input
                type="email"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="New York"
              />
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Country
              </label>
              <input
                type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="United States"
              />
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Postal Code
              </label>
              <input
                type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="Postal Code"
              />
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300" />

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          About Me
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                About me
              </label>
              <textarea
                type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                rows="4"
              >
                    A beautiful UI Kit and Admin for VueJS & Tailwind CSS. It is Free
                    and Open Source.
                  </textarea
              >
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      formData: {
        type: Object,
        default: () => ({
          formTitle: "Reactor de lecho fijo",
          formSections: [
            {
              section: "Tipo de reactor",
              fields: [
                {
                  name: "reactor_type",
                  label: "Tipo de reactor",
                  type: "select",
                  options: [
                    {
                      value: "pfr",
                      label: "PFR",
                      disabled: false,
                    },
                    {
                      value: "cstr",
                      label: "CSTR",
                      disabled: true,
                    },
                  ],
                  default: "pfr",
                  required: true,
                  help: "Select the type of reactor"
                },
                {
                  name: "variable_type",
                  label: "Tipo de variable",
                  type: "select",
                  options: [
                    {
                      value: "flow",
                      label: "Flujo",
                      disabled: true,
                    },
                    {
                      value: "conversion",
                      label: "Conversión",
                      disabled: false,
                    },
                  ],
                  default: "flow",
                  required: true,
                  help: "Select the type of reactor (flujo o conversión)"
                },
                {
                  name: "chemical_reaction",
                  label: "Reacción química",
                  type: "text",
                  // default: "A + B -> C",
                  required: true,
                  help: "Chemical reaction of the reactor"
                },
                {
                  //variable de calculo de velocidad de reacción - concentración o presiones parciales
                  name: "reaction_rate_variable",
                  label: "Variable de velocidad de reacción",
                  type: "select",
                  options: [
                    {
                      value: "concentration",
                      label: "Concentración",
                      disabled: false,
                    },
                    {
                      value: "pressure",
                      label: "Presiones parciales",
                      disabled: true,
                    },
                  ],
                  default: "concentration",
                  required: true,
                  help: "Select the variable for the reaction rate",
                },
              ],
            },
            {
              section: "Datos del reactor",
              fields: [
                {
                  name: "intial_pressure",
                  label: "Presión inicial",
                  type: "number",
                  // default: 1,
                  required: true,
                  help: "Initial pressure of the reactor",
                },
                {
                  name: "intial_temperature",
                  label: "Temperatura inicial",
                  type: "number",
                  // default: 300,
                  required: true,
                  help: "Initial temperature of the reactor",
                },
                {
                  name: "total_initial_flow",
                  label: "Flujo total inicial (FT0)",
                  type: "number",
                  // default: 1,
                  required: true,
                  help: "Initial total flow of the reactor",
                },
                {
                  name: "initial_molar_fraction_A",
                  label: "Fracción molar inicial de A (yA0)",
                  type: "number",
                  // default: 1,
                  required: true,
                  help: "Initial molar fraction of A",
                },
                {
                  name: "initial_molar_fraction_B",
                  label: "Fracción molar inicial de B (yB0)",
                  type: "number",
                  // default: 0,
                  required: true,
                  help: "Initial molar fraction of B",
                },
                {
                  name: "initial_molar_fraction_C",
                  label: "Fracción molar inicial de C (yC0)",
                  type: "number",
                  // default: 0,
                  required: true,
                  help: "Initial molar fraction of C",
                },
                {
                  name: "inactive_fraction",
                  label: "Fracción inerte (yI)",
                  type: "text",
                  // default: 0,
                  required: true,
                  help: "Inert fraction",
                },
              ],
            },
          ],
        }),
        required: true
      }
    },
    mounted() {
        console.log(this.formData)
    }
}
</script>