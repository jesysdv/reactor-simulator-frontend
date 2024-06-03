<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <CardReactor
        :formData="formData"
      />
    </div>
  </div>
</template>
<script>
import CardReactor from "@/components/Cards/CardReactor.vue";

export default {
  components: {
    CardReactor,
  },
  data() {
    return {
      formData: {
        formTitle: "Simulación de reactor químico",
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
                    value: "batch",
                    label: "BATCH",
                  },
                  {
                    value: "cstr",
                    label: "CSTR",
                  },
                  {
                    value: "pfr",
                    label: "PFR",
                  },
                  {
                    value: "pbr",
                    label: "PBR",
                  }
                ],
                default: "default",
                required: true,
                help: "Select the type of reactor"
              },
              {
                name: "variable_type",
                label: "Tipo de variable",
                type: "select",
                options: [
                  {
                    value: "flux",
                    label: "Flujo",
                  },
                  {
                    value: "conversion",
                    label: "Conversión",
                  },
                ],
                default: "default",
                required: true,
                help: "Select the type of reactor (flujo o conversión)"
              },
              {
                name: "chemical_reaction",
                label: "Reacción química",
                type: "math",
                default: "a +  \\frac{1}{2}b \\rightarrow c",
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
                  },
                  {
                    value: "pressure",
                    label: "Presiones parciales",
                  },
                ],
                default: "default",
                required: true,
                help: "Select the variable for the reaction rate",
              },
            ],
          },
          {
            section: "Datos del reactor",
            fields: [
              {
                name: "ft0",
                label: "Flujo total inicial (FT0)",
                type: "number",
                default: 1.5,
                required: true,
                help: "Initial total flow of the reactor",
                showIf: [
                  {
                    field: "reactor_type",
                    value: "pfr",
                    or: {
                      field: "reactor_type",
                      value: "pbr",
                      or: {
                        field: "reactor_type",
                        value: "cstr",
                      }
                    }
                  }
                ]
              },
              {
                name: "nt0",
                label: "Número de moles inicial (NT0)",
                type: "number",
                default: 1,
                required: true,
                help: "Initial number of moles of the reactor",
                showIf: [
                  {
                    field: "reactor_type",
                    value: "batch",
                  }
                ]
              },
              {
                name: "vt",
                label: "Volumen total del reactor (VT)",
                type: "number",
                default: 1,
                required: true,
                help: "Total volume of the reactor",
                showIf: [
                  {
                    field: "reactor_type",
                    value: "batch",
                  }
                ]
              },
              {
                name: "ea",
                label: "Energía de activación (EA)",
                type: "number",
                default: 6.40,
                required: true,
                help: "Activation energy of the reactor",
              },
              {
                name: "a",
                label: "Factor pre-exponencial (A)",
                type: "number",
                default: 1,
                required: true,
                help: "Pre-exponential factor of the reactor",
              },
              {
                name: "intial_pressure",
                label: "Presión inicial",
                type: "number",
                default: 10,
                required: true,
                help: "Initial pressure of the reactor",
              },
              {
                name: "intial_temperature",
                label: "Temperatura inicial",
                type: "number",
                default: 533.15,
                required: true,
                help: "Initial temperature of the reactor",
              },
              {
                name: "initial_molar_fraction_A",
                label: "Fracción molar inicial de A (yA0)",
                type: "number",
                default: 0.67,
                required: true,
                help: "Initial molar fraction of A",
              },
              {
                name: "initial_molar_fraction_B",
                label: "Fracción molar inicial de B (yB0)",
                type: "number",
                default: 0.33,
                required: true,
                help: "Initial molar fraction of B",
              },
              {
                name: "initial_molar_fraction_C",
                label: "Fracción molar inicial de C (yC0)",
                type: "number",
                default: 0,
                required: true,
                help: "Initial molar fraction of C",
              },
              {
                name: "initial_molar_fraction_D",
                label: "Fracción molar inicial de D (yD0)",
                type: "number",
                default: 0,
                required: true,
                help: "Initial molar fraction of D",
              }
            ],
          },
          {
            section: "Datos de la reacción",
            fields: [
              {
                name: "reaction_rate_equation",
                label: "Ecuación de velocidad de reacción para el reactivo limitante (rA)",
                type: "math",
                default: "1",
                required: true,
                help: "Reaction rate equation for the limiting reactant",
              },
              {
                name: "partial_equation_ca",
                label: "Ecuación de concentración/presión parcial CA",
                type: "math",
                default: "1",
                required: true,
                help: "Concentration equation CA"
              },
              {
                name: "partial_equation_cb",
                label: "Ecuación de concentración/presión parcial CB",
                type: "math",
                default: "1",
                required: true,
                help: "Concentration equation CB",
              },
              {
                name: "partial_equation_cc",
                label: "Ecuación de concentración/presión parcial CC",
                type: "math",
                default: "1",
                required: true,
                help: "Concentration equation CC",
              },
              {
                name: "partial_equation_cd",
                label: "Ecuación de concentración/presión parcial CD",
                type: "math",
                default: "1",
                required: true,
                help: "Concentration equation CD",
              }
            ]
          },
          {
            section: "Otros datos",
            fields: [
              {
                name: "initial_time",
                label: "Tiempo inicial",
                type: "number",
                default: 1,
                required: true,
                help: "Initial time of the reactor",
              },
              {
                name: "final_time",
                label: "Tiempo final",
                type: "number",
                default: 140,
                required: true,
                help: "Final time of the reactor",
              },
              {
                name: "pressure_drop",
                label: "Caída de presión",
                type: "checkbox",
                default: false,
                required: false,
                help: "Pressure drop in the reactor",
              },
              {
                name: "dP_equation",
                label: "Ecuación de caída de presión",
                type: "math",
                default: "1",
                required: false,
                help: "Pressure drop equation",
                showIf: [
                  {
                    field: "pressure_drop",
                    value: true,
                  }
                ]
              },
              {
                name: "temperature_drop",
                label: "Caída de temperatura",
                type: "checkbox",
                default: false,
                required: false,
                help: "Temperature drop in the reactor",
              },
              {
                name: "dT_equation",
                label: "Ecuación de caída de temperatura",
                type: "math",
                default: "1",
                required: false,
                help: "Temperature drop equation",
                showIf: [
                  {
                    field: "temperature_drop",
                    value: true,
                  }
                ]
              },
              {
                name: "heat_capacity_A",
                label: "Calor específico de referencia de A (CpA)",
                type: "number",
                default: 1,
                required: true,
                help: "Heat capacity of A",
                showIf: [
                  {
                    field: "temperature_drop",
                    value: true,
                  },
                  {
                    field: "reactor_type",
                    value: "pfr",
                    or: {
                      field: "reactor_type",
                      value: "pbr",
                      or: {
                        field: "reactor_type",
                        value: "batch",
                      }
                    }
                  }
                ]
              },
              {
                name: "heat_capacity_B",
                label: "Calor específico de referencia de B (CpB)",
                type: "number",
                default: 1,
                required: true,
                help: "Heat capacity of B",
                showIf: [
                  {
                    field: "temperature_drop",
                    value: true,
                  },
                  {
                    field: "reactor_type",
                    value: "pfr",
                    or: {
                      field: "reactor_type",
                      value: "pbr",
                      or: {
                        field: "reactor_type",
                        value: "batch",
                      }
                    }
                  }
                ]
              },
              {
                name: "heat_capacity_C",
                label: "Calor específico de referencia de C (CpC)",
                type: "number",
                default: 1,
                required: true,
                help: "Heat capacity of C",
                showIf: [
                  {
                    field: "temperature_drop",
                    value: true,
                  },
                  {
                    field: "reactor_type",
                    value: "pfr",
                    or: {
                      field: "reactor_type",
                      value: "pbr",
                      or: {
                        field: "reactor_type",
                        value: "batch",
                      }
                    }
                  }
                ]
              },
              {
                name: "heat_capacity_D",
                label: "Calor específico de referencia de D (CpD)",
                type: "number",
                default: 1,
                required: true,
                help: "Heat capacity of D",
                showIf: [
                  {
                    field: "temperature_drop",
                    value: true,
                  },
                  {
                    field: "reactor_type",
                    value: "pfr",
                    or: {
                      field: "reactor_type",
                      value: "pbr",
                      or: {
                        field: "reactor_type",
                        value: "batch",
                      }
                    }
                  }
                ]
              },
              {
                name: "enthalpy_A",
                label: "Entalpía de referencia de A (HAref)",
                type: "number",
                default: 1,
                required: true,
                help: "Reference enthalpy of A",
                showIf: [
                  {
                    field: "temperature_drop",
                    value: true,
                  },
                  {
                    field: "reactor_type",
                    value: "pfr",
                    or: {
                      field: "reactor_type",
                      value: "pbr",
                      or: {
                        field: "reactor_type",
                        value: "batch",
                      }
                    }
                  }
                ]
              },
              {
                name: "enthalpy_B",
                label: "Entalpía de referencia de B (HBref)",
                type: "number",
                default: 1,
                required: true,
                help: "Reference enthalpy of B",
                showIf: [
                  {
                    field: "temperature_drop",
                    value: true,
                  },
                  {
                    field: "reactor_type",
                    value: "pfr",
                    or: {
                      field: "reactor_type",
                      value: "pbr",
                      or: {
                        field: "reactor_type",
                        value: "batch",
                      }
                    }
                  }
                ]
              },
              {
                name: "enthalpy_C",
                label: "Entalpía de referencia de C (HCref)",
                type: "number",
                default: 1,
                required: true,
                help: "Reference enthalpy of C",
                showIf: [
                  {
                    field: "temperature_drop",
                    value: true,
                  },
                  {
                    field: "reactor_type",
                    value: "pfr",
                    or: {
                      field: "reactor_type",
                      value: "pbr",
                      or: {
                        field: "reactor_type",
                        value: "batch",
                      }
                    }
                  }
                ]
              },
              {
                name: "enthalpy_D",
                label: "Entalpía de referencia de D (HDref)",
                type: "number",
                default: 1,
                required: true,
                help: "Reference enthalpy of D",
                showIf: [
                  {
                    field: "temperature_drop",
                    value: true,
                  },
                  {
                    field: "reactor_type",
                    value: "pfr",
                    or: {
                      field: "reactor_type",
                      value: "pbr",
                      or: {
                        field: "reactor_type",
                        value: "batch",
                      }
                    }
                  }
                ]
              },
              {
                name: "reference_temperature",
                label: "Temperatura de referencia (Tref)",
                type: "number",
                default: 1,
                required: true,
                help: "Reference temperature",
                showIf: [
                  {
                    field: "temperature_drop",
                    value: true,
                  },
                  {
                    field: "reactor_type",
                    value: "pfr",
                    or: {
                      field: "reactor_type",
                      value: "pbr",
                      or: {
                        field: "reactor_type",
                        value: "batch",
                      }
                    }
                  }
                ]
              }
            ],
          }
        ],
      },
    };
  },
};
</script>
