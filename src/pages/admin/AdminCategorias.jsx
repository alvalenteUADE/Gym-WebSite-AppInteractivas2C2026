import { useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import MuiButton from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Section from '../../components/layout/Section'
import CategoriaFormDialog from '../../components/forms/CategoriaFormDialog'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { useCategorias } from '../../hooks/useCategorias'
import '../../styles/pages/AdminCategorias.css'


const DIALOGO_CERRADO = { modo: 'cerrado', categoria: null }

function AdminCategorias() {
  const {
    categorias,
    cargando,
    errorCarga,
    guardando,
    crear,
    modificar,
    eliminar,
  } = useCategorias()

  const [busqueda, setBusqueda] = useState('')
  const [dialogo, setDialogo] = useState(DIALOGO_CERRADO)
  const [aEliminar, setAEliminar] = useState(null)
  const [aviso, setAviso] = useState('')


  const filtradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    if (!termino) {
      return categorias
    }

    return categorias.filter((categoria) =>
      categoria.nombre.toLowerCase().includes(termino),
    )
  }, [categorias, busqueda])

  const abrirCreacion = () => setDialogo({ modo: 'crear', categoria: null })

  const abrirEdicion = (categoria) => setDialogo({ modo: 'editar', categoria })

  const cerrarDialogo = () => setDialogo(DIALOGO_CERRADO)

  const guardar = async (nombre) => {
    const esEdicion = dialogo.modo === 'editar'

    const resultado = esEdicion
      ? await modificar(dialogo.categoria._id, nombre)
      : await crear(nombre)

    if (resultado.ok) {
      cerrarDialogo()
      setAviso(
        esEdicion
          ? `Se modificó la categoría «${nombre}».`
          : `Se creó la categoría «${nombre}».`,
      )
    }


    return resultado
  }

  const confirmarEliminacion = async () => {
    const resultado = await eliminar(aEliminar._id)

    if (resultado.ok) {
      setAviso(`Se eliminó la categoría «${aEliminar.nombre}».`)
      setAEliminar(null)
    }
  }

  const hayCategorias = categorias.length > 0
  const hayResultados = filtradas.length > 0

  return (
    <>
      <Section
        id="categorias"
        eyebrow="Gestión"
        title="Categorías"
        description="Las categorías agrupan las publicaciones del sitio y son el filtro que usan los visitantes. Cada publicación pertenece a una."
      >
        <Box className="categorias__toolbar">
          <TextField
            className="categorias__search"
            label="Buscar categoría"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            type="search"
            size="small"
            disabled={cargando || !hayCategorias}
          />

          <MuiButton
            variant="contained"
            onClick={abrirCreacion}
            disabled={cargando}
          >
            Nueva categoría
          </MuiButton>
        </Box>

        {errorCarga && (
          <Alert severity="error" className="categorias__alert">
            {errorCarga}
          </Alert>
        )}

        {cargando ? (
          <Box className="categorias__loading" role="status">
            <CircularProgress size={28} />
            <Typography component="span">Cargando categorías…</Typography>
          </Box>
        ) : (
          <>
            {!hayCategorias && !errorCarga && (
              <Box className="categorias__empty">
                <Typography component="h3" variant="h3">
                  Todavía no hay categorías
                </Typography>
                <Typography component="p">
                  Creá la primera para poder empezar a clasificar las
                  publicaciones del sitio.
                </Typography>
                <MuiButton variant="contained" onClick={abrirCreacion}>
                  Crear la primera categoría
                </MuiButton>
              </Box>
            )}

            {hayCategorias && !hayResultados && (
              <Box className="categorias__empty">
                <Typography component="p">
                  No hay categorías que coincidan con «{busqueda.trim()}».
                </Typography>
              </Box>
            )}

            {hayResultados && (
              <TableContainer className="categorias__table-wrapper">
                <Table aria-label="Listado de categorías">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell align="center">Publicaciones</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filtradas.map((categoria) => {
                      const enUso = categoria.publicaciones > 0

                      return (
                        <TableRow key={categoria._id} hover>
                          <TableCell className="categorias__name">
                            {categoria.nombre}
                          </TableCell>

                          <TableCell align="center">
                            <Chip
                              label={categoria.publicaciones}
                              size="small"
                              color={enUso ? 'primary' : 'default'}
                              variant={enUso ? 'filled' : 'outlined'}
                            />
                          </TableCell>

                          <TableCell align="right">
                            <Box className="categorias__actions">
                              <MuiButton
                                size="small"
                                variant="outlined"
                                onClick={() => abrirEdicion(categoria)}
                              >
                                Modificar
                              </MuiButton>

                              <Tooltip
                                title={
                                  enUso
                                    ? 'Tiene publicaciones asociadas'
                                    : 'Eliminar categoría'
                                }
                              >
                                <IconButton
                                  aria-label={`Eliminar ${categoria.nombre}`}
                                  onClick={() => setAEliminar(categoria)}
                                  size="small"
                                >
                                  <Box
                                    component="span"
                                    className="categorias__delete-icon"
                                    aria-hidden="true"
                                  >
                                    ×
                                  </Box>
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Section>


      {dialogo.modo !== 'cerrado' && (
        <CategoriaFormDialog
          categoria={dialogo.categoria}
          guardando={guardando}
          onGuardar={guardar}
          onCerrar={cerrarDialogo}
        />
      )}

      <ConfirmDialog
        abierto={Boolean(aEliminar)}
        titulo="Eliminar categoría"
        mensaje={`¿Seguro que querés eliminar «${aEliminar?.nombre}»? Esta acción no se puede deshacer.`}
        bloqueo={
          aEliminar?.publicaciones > 0
            ? `«${aEliminar.nombre}» tiene ${aEliminar.publicaciones} publicación(es) asociada(s). Reasignalas o eliminalas antes de borrar la categoría.`
            : ''
        }
        procesando={guardando}
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setAEliminar(null)}
      />

      <Snackbar
        open={Boolean(aviso)}
        autoHideDuration={4000}
        onClose={() => setAviso('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setAviso('')}>
          {aviso}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AdminCategorias
