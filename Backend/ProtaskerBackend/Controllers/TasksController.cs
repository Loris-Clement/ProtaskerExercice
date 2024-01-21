using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using ProtaskerBackend.Data;
using ProtaskerBackend.Models;
using OfficeOpenXml;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace ProtaskerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ProtaskerBackendContext _context;

        public TasksController(ProtaskerBackendContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tasks>>> GetTasks()
        {
          if (_context.Tasks == null)
          {
              return NotFound();
          }
            return await _context.Tasks.Include(task => task.User).ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tasks>> GetTasks(int id)
        {
          if (_context.Tasks == null)
          {
              return NotFound();
          }
            var tasks = await _context.Tasks.FindAsync(id);

            if (tasks == null)
            {
                return NotFound();
            }

            return tasks;
        }

        // Excel export
        [HttpGet("export")]
        public async Task<ActionResult> ExcelTask(string? search, byte? status, int? userId)
        {
            var tasks = await _context.Tasks.Include(x => x.User).Where(t =>
                (search == null || t.Text.ToLower().Contains(search.ToLower())) &&
                (status == null || t.Status == status &&
                (userId == null || t.UserId == userId)
                )).OrderBy(t => t.Text).ToListAsync();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage();

            ExcelWorksheet sheet = package.Workbook.Worksheets.Add("tasks");

            sheet.Cells[1, 1].Value = "Libellé de la tâche";
            sheet.Cells[1, 2].Value = "Attribution";
            sheet.Cells[1, 3].Value = "Statut";

            int recordIndex = 2;
            foreach (Models.Tasks  task in tasks)
            {
                sheet.Cells[recordIndex, 1].Value = task.Text;
                sheet.Cells[recordIndex, 2].Value = task.User == null ? "null" : $"{task.User?.FirstName} {task.User?.LastName}";
                sheet.Cells[recordIndex, 3].Value = status switch
                {
                    0 => "En cours",
                    1 => "Bloqué",
                    _ => "Terminé",
                };
                recordIndex++;
            }

            sheet.Column(1).AutoFit();
            sheet.Column(2).AutoFit();
            sheet.Column(3).AutoFit();

            package.SaveAs("Export/tasks.xlsx");
            string filePath = package.File.FullName;
            string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            return PhysicalFile(filePath, contentType, package.File.Name);
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTasks(int id, Tasks tasks)
        {
            if (id != tasks.Id)
            {
                return BadRequest();
            }

            _context.Entry(tasks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TasksExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tasks>> PostTasks(Tasks tasks)
        {
          if (_context.Tasks == null)
          {
              return Problem("Entity set 'ProtaskerBackendContext.Tasks'  is null.");
          }
            _context.Tasks.Add(tasks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTasks", new { id = tasks.Id }, tasks);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTasks(int id)
        {
            if (_context.Tasks == null)
            {
                return NotFound();
            }
            var tasks = await _context.Tasks.FindAsync(id);
            if (tasks == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(tasks);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TasksExists(int id)
        {
            return (_context.Tasks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
