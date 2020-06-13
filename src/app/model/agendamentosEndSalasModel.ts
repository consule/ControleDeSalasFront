export interface AgendamentosEndSalasModel {
    idAgendamento: number,
    idSala: number,
    titulo: string,
    dataHoraInicial: Date,
    dataHoraFinal: Date,
    dataCriacaoAgendamento: Date,
    nomeSala: string,
    capacidadeSala: number
}